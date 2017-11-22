"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inject_1 = require("../inject/inject");
const Q = require("bluebird");
const _ = require("lodash");
const util_1 = require("../util/util");
class ModuleManager {
    constructor() {
        this._modules = [];
        this._isModulesLoaded = false;
    }
    register(func, async = false) {
        this._modules.push({ fn: func, async: async });
    }
    initialize() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this._runModules(this._modules.slice());
        });
    }
    _runModules(modules) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!modules || modules.length <= 0) {
                return;
            }
            let asyncModules = [], syncModules = [], isAsyncMode = modules[0].async;
            while (modules.length) {
                let module = modules[0];
                if (module.async != isAsyncMode) {
                    break;
                }
                isAsyncMode ? asyncModules.push(module.fn) : syncModules.push(module.fn);
                modules.shift();
            }
            yield (isAsyncMode ? this._runAsyncModules(asyncModules) : this._runSyncModules(syncModules));
            yield this._runModules(modules);
        });
    }
    _runAsyncModules(modules) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield Q.map(modules, moduleFn => this._createModuleCallback(moduleFn));
        });
    }
    _runSyncModules(modules) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (let moduleFn of modules) {
                yield this._createModuleCallback(moduleFn);
            }
        });
    }
    _createModuleCallback(moduleFn) {
        //remove the callback arg
        let args = util_1.Util.getFunctionArgs(moduleFn), lastArg = _.last(args), isCallback = false;
        if (_.includes(['callback', 'next', 'fn', 'func'], lastArg)) {
            args = _.initial(args);
            isCallback = true;
        }
        let dependencies = _.map(args, (arg) => inject_1.default.getObject(arg));
        if (isCallback) {
            return Q.fromCallback((callback) => moduleFn.apply(moduleFn, dependencies.concat([callback])));
        }
        return Q.try(() => moduleFn.apply(moduleFn, dependencies));
    }
    load(fn) {
        return this._createModuleCallback(fn);
    }
    reset() {
        this._modules.length = 0;
    }
}
exports.ModuleManager = ModuleManager;
exports.default = new ModuleManager();
//# sourceMappingURL=modules.js.map