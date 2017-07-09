"use strict";
import    inject from '../inject/inject';
import    Q = require('bluebird');
import   _ = require('lodash');
import {Util} from "../util/util";


export class ModuleManager {
    private _modules: { fn: (...args: any[]) => void, async: boolean }[];
    private _isModulesLoaded: boolean;

    constructor() {
        this._modules = [];

        this._isModulesLoaded = false;
    }

    public register(func: (...args: any[]) => void, async: boolean = false) {
        this._modules.push({fn: func, async: async})
    }

    public async initialize(): Promise<void> {

        await this._runModules(this._modules.slice())
    }

    private async _runModules(modules: { fn: (...args: any[]) => void, async: boolean }[]) {

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


        await (isAsyncMode ? this._runAsyncModules(asyncModules) : this._runSyncModules(syncModules));

        await this._runModules(modules);

    }

    private async _runAsyncModules(modules: ((...args: any[]) => void)[]) {
        await Q.map(modules,moduleFn=>this._createModuleCallback(moduleFn))
    }

    private async _runSyncModules(modules: ((...args: any[]) => void)[]) {
        for (let moduleFn of modules) {
            await this._createModuleCallback(moduleFn)
        }
    }

    private _createModuleCallback(moduleFn: (...args: any[]) => void): PromiseLike<any> {

        //remove the callback arg
        let args = Util.getFunctionArgs(moduleFn),
            lastArg = _.last(args),
            isCallback = false;

        if (_.includes(['callback', 'next', 'fn', 'func'], lastArg)) {
            args = _.initial(args);
            isCallback = true;
        }

        let dependencies = _.map(args, (arg: string) => inject.getObject(arg));

        if (isCallback) {
            return Q.fromCallback((callback) => moduleFn.apply(moduleFn, dependencies.concat([callback])));
        }

        return Q.try(() => moduleFn.apply(moduleFn, dependencies))
    }

    public reset() {
        this._modules.length = 0;
    }
}


export default  new ModuleManager();