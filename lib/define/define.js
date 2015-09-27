"use strict";
var inject = require('../inject/inject'),
    _ = require('lodash');

let plugins = [];

let define = function ($config, klass) {

    //create namespace
    if($config.namespace){
        _.namespace($config.namespace,klass)
    }

    //create inject
    if ($config.id) {

        var def = {
            singleton: $config.singleton,
            initMethod: $config.initMethod,
            props: $config.properties,
            type: klass,
            args: $config.args,
            inject: $config.inject,
            lazy: $config.lazy,
            injectorAware: $config.injectorAware,
            alias: $config.alias
        };

        inject.addDefinition($config.id,def);
    }

    //create statics
    _.forEach($config.statics, function (func, name) {

        Object.defineProperty(klass, name, {
            get : function () { return func }
        });

        Object.defineProperty(klass.prototype, name, {
            get : function () { return func }
        });
    });

    //run on plugins
    _.forEach(plugins, function (func) {
        func($config, klass);
    });
};


module.exports.define = define;

module.exports.definePlugin = function (func) {
    plugins.push(func)
};