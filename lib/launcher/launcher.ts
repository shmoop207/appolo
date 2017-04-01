"use strict";
import {EventDispatcher} from '../events/event-dispatcher';
import    filesLoader from '../loader/loader';
import    environments  from '../environments/environments';
import    inject  from '../inject/inject';
import    {define}  from '../define/definefn';
import    moduleManager from '../modules/modules';
import   path = require('path');
import   fs = require('fs');
import    _ = require('lodash');
import    Q = require('bluebird');
import {IOptions} from "../IOptions";
import {Util} from "../util/util";
import {IBootstrap} from "../IBootstrap";

export class Launcher extends EventDispatcher {

    protected cachedRequire: string[];
    protected _options: IOptions;

    constructor() {

        super();

        this.cachedRequire = [];
        this._options = {};

    }

    public async launch(config?: IOptions, callback?: Function): Promise<void> {

        try {

            this._options = this.loadOptions(config);

            this.loadEnvironments();

            await this.loadModules();

            this.loadFiles();

            this.loadInjector();

            await this.loadBootStrap();

            callback && callback();

            this.fireEvent('appolo-launched');

        } catch (e) {
            if (!callback) {
                throw e;
            }

            callback(e);
        }

    }

    protected loadOptions(config: IOptions): IOptions {

        let defaults = {
            paths: ['config', 'server'],
            root: process.cwd(),
            environment: (process.env.NODE_ENV || 'development'),
            bootStrapClassId: 'appolo-bootstrap'
        };

        return _.extend(defaults, config || {});

    }

    protected loadEnvironments() {
        let allPath = path.join(this._options.root, 'config/environments/all.js'),
            environmentPath = path.join(this._options.root, 'config/environments/', this._options.environment + '.js');

        if (fs.existsSync(allPath)) {

            let all = require(allPath);

            let environment = fs.existsSync(environmentPath) ? require(environmentPath) : {};

            this.cachedRequire.push(allPath);
            this.cachedRequire.push(environmentPath);

            //add current env config to appolo env
            _.defaultsDeep(environments, environment || {}, all);

            //save evn name
            environments.type = this._options.environment;

            let pkg;

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

    protected loadModules(): Promise<void> {
        let modulesPath = path.join(this._options.root, 'config/modules/modules.js');

        if (fs.existsSync(modulesPath)) {
            let modulesFunc = require(modulesPath);

            if (_.isFunction(modulesFunc)) {
                let args = Util.getFunctionArgs(modulesFunc);

                let dependencies = _.map(args, (arg) => inject.getObject(arg));

                modulesFunc.apply(modulesFunc, dependencies);
            }

            this.cachedRequire.push(modulesPath);
        }


        return moduleManager.initialize();
    }

    protected loadFiles() {
        let loadPaths = _.union(this._options.paths, environments.paths);

        //load env files
        for (let filePath of filesLoader.load(this._options.root, loadPaths)) {
            try {
                let obj = require(filePath);
                this.cachedRequire.push(filePath);

                if (obj && _.isFunction(obj) && _.isObject(obj.$config)) {
                    define(obj.$config, obj);
                }
            } catch (e) {
                console.error(`failed to require ${filePath}`);

                throw e
            }

        }
    }


    protected loadInjector() {
        let definitions = {},
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

    protected async  loadBootStrap(): Promise<void> {

        let bootstrapDef = inject.getDefinition(this._options.bootStrapClassId);

        if (!bootstrapDef) {
            return Promise.resolve();
        }

        let bootstrap = inject.getObject<IBootstrap>(this._options.bootStrapClassId);

        let args = Util.getFunctionArgs(bootstrap.run);

        //we don't have any callback so just run bootstrap
        if (args.length == 0) {

            return bootstrap.run();

        } else {

            return Q.fromCallback(callback => bootstrap.run(callback));
        }
    }


    public reset(isSoftReset?: boolean): void {

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

        let definitions = new Map(inject.getDefinitions());

        inject.reset();

        if (isSoftReset) {
            inject.addDefinitions(definitions);
        }

        process.removeAllListeners();
    }

    public softReset() {

        this.reset(true);
    }


}


export let launcher = new Launcher()
