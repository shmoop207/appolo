var Class = require('appolo-class'),
    environments = require('../environments/environments'),
    inject = require('../inject/inject'),
    async = require('async'),
    _ = require('lodash');

var ModuleManager = Class.define({

    constructor:function(){
        this._modules = [];
    },

    register:function(func){
        this._modules.push(func)
    },

    initialize:function(callback){

        var series = _.map(this._modules,function(func){

            return function(callback){
                //remove the callback arg
                var args = _.initial(_.getFunctionArgs(func));

                var dependencies = _.map(args,function(arg){
                    return inject.getObject(arg);
                });

                dependencies.push(callback);

                func.apply(func,dependencies );
            }
        });

        async.series(series,callback);
    },

    reset:function(){
        this._modules.length = 0;
    }
});


module.exports = new ModuleManager();