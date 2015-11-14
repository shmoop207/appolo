"use strict";
var inject = require('../inject/inject'),
    Linq = require('./linq'),
    _ = require('lodash');

let plugins = [];


let define = function ($config, klass) {

    //check if we using linq
    if(_.isString($config) || _.isFunction($config)){
        return new Linq($config,klass);
    }

    klass = klass|| $config.type;

    //create namespace
    if($config.namespace){
        _.namespace($config.namespace,klass )
    }

    //create inject
    if ($config.id) {

        var def = {
            singleton: $config.singleton,
            initMethod: $config.initMethod,
            props: $config.properties,
            type: klass ,
            args: $config.args,
            inject: $config.inject,
            lazy: $config.lazy,
            injectorAware: $config.injectorAware,
            alias: $config.alias,
            aliasFactory: $config.aliasFactory
        };

        inject.addDefinition($config.id,def);
    }

    if ($config.mixins) {
        setMixins($config.mixins,klass);
    }

    if ($config.statics) {
        setStatics($config.statics, klass);
    }

    //run on plugins
    _.forEach(plugins, function (func) {
        func($config, klass);
    });
};



function setStatics(statics,klass){
    _.forEach(statics, function (func, name) {

        Object.defineProperty(klass, name, {
            get : function () { return func }
        });

        Object.defineProperty(klass.prototype, name, {
            get : function () { return func }
        });
    });
}

function setMixins(mixins,klass){
    _.forEach(_.isArray(mixins) ? mixins : [mixins],  (mixin) => {
        _(Object.getOwnPropertyNames(mixin.prototype))
            .without("constructor")
            .forEach(name => klass.prototype[name] = mixin.prototype[name])
            .value();
    });
}


module.exports.define = define;

module.exports.definePlugin = function (func) {
    plugins.push(func)
};