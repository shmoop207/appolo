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
    register(func) {
        this._modules.push(func);
    }
    initialize() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (let moduleFn of this._modules) {
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
    reset() {
        this._modules.length = 0;
    }
}
exports.ModuleManager = ModuleManager;
exports.default = new ModuleManager();
//# sourceMappingURL=modules.js.map