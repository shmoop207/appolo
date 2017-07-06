"use strict";
import inject from '../inject/inject';

import    _ = require('lodash');
import {IDefinition} from "../IDefinition";
import {Util} from "../util/util";
import {Define} from "./define";

let plugins = [];

export function define ($config:string|IDefinition|Function, klass?:Function):Define {

    if(_.isString($config) || _.isFunction($config)){
        return new Define($config,klass);
    }

    klass = klass|| $config.type;

    //create namespace
    if($config.namespace){
        Util.namespace($config.namespace,klass )
    }

    //create inject
    if ($config.id) {

        $config.type = klass;


        inject.addDefinition($config.id,$config);
    }

    if ($config.mixins) {
        Util.mixins(klass,$config.mixins);
    }

    if ($config.statics) {
        Util.statics(klass, $config.statics);
    }

    //run on plugins
    _.forEach(plugins,  (func)=> {
        func($config, klass);
    });
}

export let definePlugin = function (func) {
    plugins.push(func)
};