"use strict";
var _ = require('lodash');

module.exports = class Linq {

    constructor( type) {
        this.definition = {
            type: type
        }
    }

    namespace(namespace){

        if(!this.definition.type){
            throw new Error("type is not defined for "+ namespace)
        }
        _.namespace(namespace ,this.definition.type);

        return this;
    }

    statics(key,value){

        if(!this.definition.type){
            throw new Error("type is not defined")
        }


        var statics = {};

        if(arguments.length == 2){
            statics[key] = value
        } else {
            statics = key;
        }

        _.forEach(statics, function (func, name) {

            Object.defineProperty(this.definition.type, name, {
                get : function () { return func }
            });

            Object.defineProperty(this.definition.type.prototype, name, {
                get : function () { return func }
            });
        },this);

        return this;
    }


}