"use strict";
import inject from '../inject/inject';

import    _ = require('lodash');
import {IDefinition} from "../IDefinition";
import {Util} from "../util/util";
import {Define} from "./define";

let plugins = [];

export function define($config: string | IDefinition | Function, klass?: Function): Define {

    if (_.isString($config) || _.isFunction($config)) {
        return new Define($config, klass);
    }

    klass = klass || ($config as IDefinition).type;

    let def = $config as IDefinition;
    //create namespace
    if (def.namespace) {
        Util.namespace(def.namespace, klass)
    }

    //create inject
    if (def.id) {

        def.type = klass;


        inject.addDefinition(def.id, def);
    }

    if (def.mixins) {
        Util.mixins(klass, def.mixins);
    }

    if (def.statics) {
        Util.statics(klass, def.statics);
    }

    //run on plugins
    _.forEach(plugins, (func) => {
        func($config, klass);
    });
}

export let definePlugin = function (func) {
    plugins.push(func)
};