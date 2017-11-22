"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const event_dispatcher_1 = require("../events/event-dispatcher");
const loader_1 = require("../loader/loader");
const environments_1 = require("../environments/environments");
const inject_1 = require("../inject/inject");
const defineFn_1 = require("../define/defineFn");
const modules_1 = require("../modules/modules");
const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const Q = require("bluebird");
const util_1 = require("../util/util");
class Launcher extends event_dispatcher_1.EventDispatcher {
    constructor() {
        super();
        this.cachedRequire = [];
        this._options = {};
    }
    launch(config, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                this._options = this.loadOptions(config);
                this.loadEnvironments();
                yield this.loadModules();
                this.loadFiles();
                this.loadInjector();
                yield this.loadBootStrap();
                callback && callback();
                this.fireEvent('appolo-launched');
            }
            catch (e) {
                if (!callback) {
                    throw e;
                }
                callback(e);
            }
        });
    }
    loadOptions(config) {
        let defaults = {
            paths: ['config', 'server'],
            root: process.cwd(),
            environment: (process.env.NODE_ENV || 'development'),
            bootStrapClassId: 'appolo-bootstrap'
        };
        return _.extend(defaults, config || {});
    }
    loadEnvironments() {
        let allPath = path.join(this._options.root, 'config/environments/all.js'), environmentPath = path.join(this._options.root, 'config/environments/', this._options.environment + '.js');
        if (fs.existsSync(allPath)) {
            let all = require(allPath);
            let environment = fs.existsSync(environmentPath) ? require(environmentPath) : {};
            this.cachedRequire.push(allPath);
            this.cachedRequire.push(environmentPath);
            //add current env config to appolo env
            _.defaultsDeep(environments_1.default, environment || {}, all);
            //save evn name
            environments_1.default.type = this._options.environment;
            let pkg;
            try {
                pkg = require(path.join(this._options.root, 'package.json'));
            }
            catch (e) {
            }
            environments_1.default.version = pkg ? pkg.version : "";
            //add root
            environments_1.default.rootDir = this._options.root;
            inject_1.default.addObject('environment', environments_1.default);
            inject_1.default.addObject('env', environments_1.default);
        }
        inject_1.default.addObject('inject', inject_1.default);
    }
    loadModules() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let modulesPath = path.join(this._options.root, 'config/modules/modules.js');
            if (fs.existsSync(modulesPath)) {
                let modulesFunc = require(modulesPath);
                if (_.isFunction(modulesFunc)) {
                    let args = util_1.Util.getFunctionArgs(modulesFunc);
                    let dependencies = _.map(args, (arg) => inject_1.default.getObject(arg));
                    let result = modulesFunc.apply(modulesFunc, dependencies);
                    //check for promise
                    if (result && result.then) {
                        yield result;
                    }
                }
                this.cachedRequire.push(modulesPath);
            }
            return modules_1.default.initialize();
        });
    }
    loadFiles() {
        let loadPaths = _.union(this._options.paths, environments_1.default.paths);
        //load env files
        for (let filePath of loader_1.default.load(this._options.root, loadPaths)) {
            try {
                let obj = require(filePath);
                this.cachedRequire.push(filePath);
                //backward support for old appolo
                if (obj && _.isFunction(obj) && _.isObject(obj.$config)) {
                    defineFn_1.define(obj.$config, obj);
                }
            }
            catch (e) {
                console.error(`failed to require ${filePath}`);
                throw e;
            }
        }
    }
    loadInjector() {
        let definitions = {}, injectPath = path.join(this._options.root, 'config/inject');
        if (fs.existsSync(injectPath)) {
            for (let filePath of loader_1.default.load(this._options.root, path.join('config', 'inject'))) {
                _.extend(definitions, require(filePath));
                this.cachedRequire.push(filePath);
            }
        }
        //load inject
        inject_1.default.initialize({
            definitions: definitions,
            root: this._options.root
        });
    }
    loadBootStrap() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let bootstrapDef = inject_1.default.getDefinition(this._options.bootStrapClassId);
            if (!bootstrapDef) {
                bootstrapDef = inject_1.default.getDefinition("appoloBootStrap");
            }
            if (!bootstrapDef) {
                return Promise.resolve();
            }
            let bootstrap = inject_1.default.getObject(this._options.bootStrapClassId);
            let args = util_1.Util.getFunctionArgs(bootstrap.run);
            //we don't have any callback so just run bootstrap
            if (args.length == 0) {
                return bootstrap.run();
            }
            else {
                return Q.fromCallback(callback => bootstrap.run(callback));
            }
        });
    }
    reset(isSoftReset) {
        if (!isSoftReset) {
            _.forEach(this.cachedRequire, function (filePath) {
                delete require.cache[filePath];
            });
            modules_1.default.reset();
        }
        this.cachedRequire.length = 0;
        this._options = null;
        _.forEach(environments_1.default, function (value, key) {
            delete environments_1.default[key];
        });
        let definitions = inject_1.default.getDefinitions();
        inject_1.default.reset();
        if (isSoftReset) {
            inject_1.default.addDefinitions(definitions);
        }
        process.removeAllListeners();
    }
    softReset() {
        this.reset(true);
    }
}
exports.Launcher = Launcher;
exports.launcher = new Launcher();
//# sourceMappingURL=launcher.js.map