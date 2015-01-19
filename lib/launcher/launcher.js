"use strict";
var EventDispatcher = require('../events/event-dispatcher'),
    filesLoader = require('../loader/loader'),
    environments = require('../environments/environments'),
    inject = require('../inject/inject'),
    moduleManager = require('../modules/modules'),
    path = require('path'),
    fs = require('fs'),
    _ = require('lodash');

var Launcher = EventDispatcher.define({

    constructor: function () {
        this.cachedRequire = [];
        this._options = {};

    },

    launch: function (config, callback) {

        this.loadOptions(config)

        this.loadEnvironments();

        this.loadModules(this._onModuleInitialized.bind(this, callback));
    },

    loadOptions: function (config) {

        var defaults = {
            paths: ['config', 'server'],
            root: process.cwd(),
            environment: (process.env.NODE_ENV || 'development'),
            bootStrapClassId: 'appolo-bootstrap'

        }

        this._options = _.extend(defaults, config || {});

        return this._options;
    },

    loadEnvironments: function () {
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
            var pkg
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
    },

    loadModules: function (callback) {
        var modulesPath = path.join(this._options.root, 'config/modules/modules.js');

        if (fs.existsSync(modulesPath)) {
            var modulesFunc = require(modulesPath);

            if (_.isFunction(modulesFunc)) {
                var args = _.getFunctionArgs(modulesFunc);

                var dependencies = _.map(args, function (arg) {
                    return inject.getObject(arg);
                });

                modulesFunc.apply(modulesFunc, dependencies);
            }

            this.cachedRequire.push(modulesPath);
        }


        moduleManager.initialize(callback);
    },

    _onModuleInitialized: function (callback, err, results) {
        if (err) {
            if (callback) {
                return callback(err)
            } else {
                throw err;
            }
        }

        this.loadFiles();

        this.loadInjector();

        this.loadBootStrap(this._onBootstrapInitialized.bind(this, callback))
    },

    _onBootstrapInitialized: function (callback, err) {

        if (err) {
            if (callback) {
                return callback(err);
            } else {
                throw err;
            }
        }

        this.fireEvent('appolo-launched');

        if (callback) {
            callback();
        }
    },


    loadFiles: function () {
        var loadPaths = _.union(this._options.paths, environments.paths);

        //load env files
        filesLoader.load(this._options.root, loadPaths, function (filePath) {
            require(filePath);
            this.cachedRequire.push(filePath);
        }.bind(this));
    },


    loadInjector: function () {
        var definitions = {},
            injectPath = path.join(this._options.root, 'config/inject');

        if (fs.existsSync(injectPath)) {

            filesLoader.load(this._options.root, path.join('config', 'inject'), function (filePath) {
                _.extend(definitions, require(filePath));
                this.cachedRequire.push(filePath);
            }.bind(this));
        }

        //load inject
        inject.initialize({
            definitions: definitions,
            root: this._options.root
        });


    },

    loadBootStrap: function (callback) {
        var bootstrapDef = inject.getDefinition(this._options.bootStrapClassId);

        if (bootstrapDef) {
            var bootstrap = inject.getObject(this._options.bootStrapClassId);

            var args = _.getFunctionArgs(bootstrap.run);

            bootstrap.run(callback)

            if (args.length == 0) {
                callback();
            }

        } else {
            callback();
        }

    },

    reset: function (isSoftReset) {

        if(!isSoftReset){
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

        var definitions = inject.getDefinitions();

        inject.reset();

        if(isSoftReset){
            inject.addDefinitions(definitions);
        }

        process.removeAllListeners();
    },

    softReset:function(){

        this.reset(true);
    }
});

module.exports = new Launcher();