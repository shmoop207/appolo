"use strict";
var EventDispatcher = require('../events/event-dispatcher'),
    filesLoader = require('../loader/loader'),
    environments = require('../environments/environments'),
    inject = require('../inject/inject'),
    define = require('../define/define'),
    moduleManager = require('../modules/modules'),
    path = require('path'),
    fs = require('fs'),
    _ = require('lodash'),
    Q = require('bluebird');

class Launcher extends EventDispatcher {

    constructor() {

        super();

        this.cachedRequire = [];
        this._options = {};

    }

    launch(config, callback) {

        return Q.try(this.loadOptions.bind(this), config)
            .then(this.loadEnvironments.bind(this))
            .then(this.loadModules.bind(this))
            .then(this.loadFiles.bind(this))
            .then(this.loadInjector.bind(this))
            .then(this.loadBootStrap.bind(this))
            .then(this._onLaunchSuccess.bind(this, callback))
            .catch(this._onLaunchError.bind(this, callback))
    }

    loadOptions(config) {

        var defaults = {
            paths: ['config', 'server'],
            root: process.cwd(),
            environment: (process.env.NODE_ENV || 'development'),
            bootStrapClassId: 'appolo-bootstrap'

        };

        this._options = _.extend(defaults, config || {});

        return this._options;
    }

    loadEnvironments() {
        var allPath = path.join(this._options.root, 'config/environments/all.js'),
            environmentPath = path.join(this._options.root, 'config/environments/', this._options.environment + '.js');

        if (fs.existsSync(allPath)) {

            var all = require(allPath);

            var environment = fs.existsSync(environmentPath) ? require(environmentPath) : {};

            this.cachedRequire.push(allPath);
            this.cachedRequire.push(environmentPath);

            //add current env config to appolo env
            _.deepExtend(environments, all, environment || {});

            //save evn name
            environments.type = this._options.environment;
            var pkg;

            try {
                pkg = require(path.join(this._options.root, 'package.json'))
            } catch (e) {
            }


            environments.version = pkg ? pkg.version : "";

            //add root
            environments.rootDir = this._options.root;

            inject.addObject('environment', environments);
            inject.addObject('env', environments);
        }

        inject.addObject('inject', inject);
    }

    loadModules() {
        var modulesPath = path.join(this._options.root, 'config/modules/modules.js');

        if (fs.existsSync(modulesPath)) {
            var modulesFunc = require(modulesPath);

            if (_.isFunction(modulesFunc)) {
                var args = _.getFunctionArgs(modulesFunc);

                var dependencies = _.map(args,  (arg)=> {
                    return inject.getObject(arg);
                });

                modulesFunc.apply(modulesFunc, dependencies);
            }

            this.cachedRequire.push(modulesPath);
        }


        return moduleManager.initialize();
    }

    loadFiles() {
        var loadPaths = _.union(this._options.paths, environments.paths);

        //load env files
        for (let filePath of filesLoader.load(this._options.root, loadPaths)) {
            try {
                var obj = require(filePath);
                this.cachedRequire.push(filePath);

                if (obj && _.isFunction(obj) && _.isObject(obj.$config)) {
                    define.define(obj.$config, obj);
                }
            } catch (e) {
                console.error(`failed to require ${filePath}`);

                throw e
            }

        }
    }


    loadInjector() {
        var definitions = {},
            injectPath = path.join(this._options.root, 'config/inject');

        if (fs.existsSync(injectPath)) {

            for (let filePath of  filesLoader.load(this._options.root, path.join('config', 'inject'))) {
                _.extend(definitions, require(filePath));
                this.cachedRequire.push(filePath);
            }
        }

        //load inject
        inject.initialize({
            definitions: definitions,
            root: this._options.root
        });
    }

    loadBootStrap() {

        var bootstrapDef = inject.getDefinition(this._options.bootStrapClassId);

        if (!bootstrapDef) {
            return Q.resolve();
        }

        var bootstrap = inject.getObject(this._options.bootStrapClassId);

        var args = _.getFunctionArgs(bootstrap.run);

        //we don't have any callback so just run bootstrap
        if (args.length == 0) {

            return bootstrap.run();

        } else {

            return Q.fromCallback(callback=>bootstrap.run(callback));
        }
    }

    _onLaunchSuccess(callback) {
        callback && callback();

        this.fireEvent('appolo-launched');
    }

    _onLaunchError(callback, err) {

        if (!callback) {
            throw err;
        }

        callback(err);

    }

    reset(isSoftReset) {

        if (!isSoftReset) {
            _.forEach(this.cachedRequire, function (filePath) {
                delete require.cache[filePath];
            });

            moduleManager.reset();
        }

        this.cachedRequire.length = 0;

        this._options = null;

        _.forEach(environments, function (value, key) {
            delete environments[key];
        });

        var definitions = new Map(inject.getDefinitions());

        inject.reset();

        if (isSoftReset) {
            inject.addDefinitions(definitions);
        }

        process.removeAllListeners();
    }

    softReset() {

        this.reset(true);
    }


}

module.exports = {
    Launcher: Launcher,
    launcher: new Launcher()
};