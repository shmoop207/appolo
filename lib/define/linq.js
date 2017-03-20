"use strict";
var _ = require('lodash'),
    util = require('../util/util'),
    inject = require('../inject/inject');

module.exports = class Linq {

    constructor($config, klass) {

        if (_.isString($config)) {
            this._inject = inject.define($config, klass);
            this._klass = klass;
            this._id = $config;
        } else if (_.isFunction($config)) {
            this._klass = $config;
        } else {
            this._klass = klass || $config.type;
            this._id = $config.id;
        }
    }

    namespace(namespace) {

        if (!this._klass) {
            throw new Error("type is not defined for " + namespace)
        }
        _.namespace(namespace, this._klass);

        return this;
    }

    interfaces(klasses) {

        if (!this._klass) {
            throw new Error("type is not defined")
        }

        klasses = _.isFunction(klasses) ? [klasses] : klasses;

        var klassName = this._klass.prototype.constructor.name || "",
            proto = this._klass.prototype;

        _.forEach(klasses,  (interfaceKlass) => {


            _(_.getAllPropertyNames(interfaceKlass)).without("constructor").forEach((methodName) => {

                if (!_.isFunction(proto[methodName])) {
                    throw new Error("error creating class " + klassName + ": class dose not implement method " + methodName + "")
                }

                var klassMethodArgs = _.getFunctionArgs(proto[methodName]);
                var interfaceMethodArgs = _.getFunctionArgs(interfaceKlass.prototype[methodName]);

                if (!_.isEqual(klassMethodArgs, interfaceMethodArgs)) {
                    throw new Error("error creating class " + klassName + ": class have invalid method args on method: " + methodName + ". " +
                        " expected: " + methodName + "(" + interfaceMethodArgs.join(',') + ")" + " actual: " + methodName + "(" + klassMethodArgs.join(',') + ")");
                }
            }).value()

        })
    }

    statics(key, value) {

        if (!this._klass) {
            throw new Error("type is not defined")
        }

        var statics = {};

        if (arguments.length == 2) {
            statics[key] = value
        } else {
            statics = key;
        }

        _.forEach(statics,  (func, name)=> {

            Object.defineProperty(this._klass, name, {
                get: function () {
                    return func
                }
            });

            Object.defineProperty(this._klass.prototype, name, {
                get: function () {
                    return func
                }
            });
        });

        return this;
    }

    mixins(mixins) {

        if (!this._klass) {
            throw new Error("type is not defined")
        }

        if (mixins) {
            _.forEach(_.isArray(mixins) ? mixins : [mixins], (mixin) => {
                _(Object.getOwnPropertyNames(mixin.prototype))
                    .without("constructor")
                    .forEach(name => this._klass.prototype[name] = mixin.prototype[name])

            });
        }
        return this
    }

    type(type) {
        this._klass = type;

        (this._inject) && this._inject.type(type);

        return this;
    }

    singleton() {
        (this._inject) && this._inject.singleton();
        return this;
    }

    inject(name, inject) {

        (this._inject) && this._inject.inject(name, inject);
        return this;
    }

    injectFactoryMethod(name, factoryMethod) {
        (this._inject) && this._inject.injectFactoryMethod(name, factoryMethod);
        return this;
    }

    injectAlias(name, alias,indexBy) {
        (this._inject) && this._inject.injectAlias(name, alias,indexBy);
        return this;
    }

    injectAliasFactory(name, alias,indexBy) {
        (this._inject) && this._inject.injectAliasFactory(name, alias,indexBy);
        return this;
    }

    injectArray(name, arr) {
        (this._inject) && this._inject.injectArray(name, arr);
        return this;
    }


    injectDictionary(name, dic) {
        (this._inject) && this._inject.injectDictionary(name, dic);
        return this;

    }

    injectFactory(name, factory) {
        (this._inject) && this._inject.injectFactory(name, factory);
        return this;
    }

    injectObjectProperty(name, object, propertyName) {
        (this._inject) && this._inject.injectObjectProperty(name, object, propertyName);
        return this;
    }

    injectValue(name, value) {
        (this._inject) && this._inject.injectValue(name, object, value);
        return this;
    }

    alias(alias) {
        (this._inject) && this._inject.alias(alias);

        return this;
    }

    initMethod(initMethod) {
        (this._inject) && this._inject.initMethod(initMethod);
        return this;
    }

    injectorAware() {
        (this._inject) && this._inject.injectorAware();
        return this;
    }


    aliasFactory(aliasFactory) {
        (this._inject) && this._inject.aliasFactory(aliasFactory);

        return this;
    }

    args(args) {
        (this._inject) && this._inject.args(args);

        return this;
    }
}