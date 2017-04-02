"use strict";
import    inject from '../inject/inject';
import    Q = require('bluebird');
import   _ = require('lodash');
import {Util} from "../util/util";


export class ModuleManager {
    private _modules: ((...args: any[]) => void)[];
    private _isModulesLoaded: boolean;

    constructor() {
        this._modules = [];

        this._isModulesLoaded = false;
    }

    public register(func: (...args: any[]) => void) {
        this._modules.push(func)
    }

    public async initialize():Promise<void> {

        for (let moduleFn of this._modules) {
            await this._createModuleCallback(moduleFn)
        }
    }

    private _createModuleCallback(moduleFn: (...args: any[]) => void):PromiseLike<any> {

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