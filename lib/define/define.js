"use strict";
var inject = require('../inject/inject'),
    Linq = require('../linq/linq'),
    _ = require('lodash');

let plugins = [];


let define = function ($config, klass) {

    if(_.isString($config)){
        var injectLinq  = inject.define($config,klass);

        //add statics and namespace methods
        _(Object.getOwnPropertyNames(Linq.prototype))
            .without("constructor")
            .forEach(name => injectLinq[name] = Linq.prototype[name])
            .value();

        return injectLinq;
    }

    if(_.isFunction($config)){
        return new Linq($config);
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

    //create statics
    setStatics($config.statics,klass);

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


module.exports.define = define;

module.exports.definePlugin = function (func) {
    plugins.push(func)
};