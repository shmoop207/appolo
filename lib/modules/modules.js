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

        return co(function* () {
            for(let moduleFn of this._modules){
               yield this._createModuleCallback(moduleFn)
            }
        }.bind(this));
    }

    _createModuleCallback(func) {

        return function (callback) {
            //remove the callback arg
            var args = _.initial(_.getFunctionArgs(func));

            var dependencies = this._getDependencies(args);

            dependencies.push(callback);

            func.apply(func, dependencies);
        }.bind(this)
    }

    _getDependencies(args) {
        return _.map(args, function (arg) {
            return inject.getObject(arg);
        });
    }

    _getCallback(callback) {
        return function (err, result) {
            if (!callback.excuted) {
                callback.excuted = true;
                callback(err, result);
            }
        }
    }

    reset() {
        this._modules.length = 0;
    }
}


module.exports = new ModuleManager();