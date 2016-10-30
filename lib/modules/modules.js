"use strict";

var environments = require('../environments/environments'),
    inject = require('../inject/inject'),
    Q = require('bluebird'),
    co = require('co'),
    _ = require('lodash');


class ModuleManager {

    constructor() {
        this._modules = [];

        this._isModulesLoaded = false;
    }

    register(func) {
        this._modules.push(func)
    }

    initialize() {

        return co(()=>this._initialize());
    }

    *_initialize() {
        for (let moduleFn of this._modules) {
            yield this._createModuleCallback(moduleFn)
        }
    }

    _createModuleCallback(moduleFn) {

        //remove the callback arg
        var args = _.getFunctionArgs(moduleFn),
            lastArg = _.last(args),
            isCallback = false;

        if (_.includes(['callback', 'next', 'fn', 'func'], lastArg)) {
            args = _.initial(args);
            isCallback = true;
        }

        var dependencies = _.map(args, (arg)=> inject.getObject(arg));

        if (isCallback) {
            return Q.fromCallback((callback)=> {
                dependencies.push(callback);
                return moduleFn.apply(moduleFn, dependencies);
            });
        }

        return Q.try(()=>moduleFn.apply(moduleFn, dependencies))
    }

    reset() {
        this._modules.length = 0;
    }
}


module.exports = new ModuleManager();