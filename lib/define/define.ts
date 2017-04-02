"use strict";
import _ = require('lodash');
import inject from '../inject/inject';
import {IDefinition} from "../IDefinition";
import {Define as DefineInject} from "appolo-inject";
import {Util} from "../util/util";


export class Define extends DefineInject {


    protected _klass: Function;

    constructor($config?: string | IDefinition | Function, klass?: Function) {

        if (_.isString($config)) {
            super(inject, $config, klass);
            this._klass = klass;
        } else {
            super(inject, null);
            this._klass = _.isFunction($config) ? $config : (klass || $config.type)

        }


    }

    public namespace(namespace:string):this {

        if (!this._klass) {
            throw new Error("type is not defined for " + namespace)
        }
        Util.namespace(namespace, this._klass);

        return this;
    }


    public statics(key:{[index:string]:any}|string, value?:any):this {

        if (!this._klass) {
            throw new Error("type is not defined")
        }

        Util.statics(this._klass, key,value);

        return this;
    }

    public mixins(mixins:Function|Function[]):this {

        if (!this._klass) {
            throw new Error("type is not defined")
        }

       Util.mixins(this._klass,mixins);

        return this
    }

    public type(type):this {
        this._klass = type;

        super.type(type);

        return this;
    }

}