"use strict";
var Class  = require('../class/class'),
    path   = require('path'),
    _ = require('lodash');

var Controller = Class.define(function () {

    var _beforeAction = [],
        _afterAction = [],
        _self;

    this.constructor = function (req, res,next, name) {
        _self = this;

        this.req = req;
        this.res = res;
        this.next = next;
        this.name = name;
    };

    this.initialize = function () {

    };

//    var callFilters = function (filters, action) {
//        var i = 0,
//            filter,
//            success = true;
//
//        //combine all filters with action filters
//        filters = (filters['*'] || []).concat((filters[action] || []));
//
//        if (filters.length > 0) {
//            (function iterator(err) {
//
//                if (err) {
//                    success = false;
//                    return;
//                }
//
//                //get the next filter
//                filter = filters[i++];
//
//                //if we have a filter call it else we finished runnig the filter return success
//                if (filter) {
//                    filter.call(_self, _self.req, _self.res, iterator);
//                }
//            })();
//        }
//
//        return success;
//    };

    this.invoke = function (action) {
        if (typeof this[action] !== 'function') {
            throw new Error(this.name + ' ' + action + ' is not a function');
        }

        this.action = action;

        //var success = callFilters(_beforeAction, action);

        //if (success) {
            this[action](_self.req, _self.res,_self.next);
            //this.devoke();
        //}
    };

   // this.devoke = function () {
    //    callFilters(_afterAction, this.action);
    //};

//    function addFilter (filters, actions, callback) {
//
//        actions = _.isArray(actions) ?  actions : [actions];
//
//        _.forEach(actions,function(action){
//            if (!filters[action]) {
//                filters[action]  = [];
//            }
//
//            filters[action].push(callback);
//        });
//
//    };

//    this.beforeAction = function (action, callback) {
//
//        addFilter(_beforeAction, action, callback);
//    };
//
//    this.afterAction = function (action, callback) {
//
//        addFilter(_afterAction, action, callback);
//    };

    this.render = function (view, model) {
        if (!model) {
            model = view;

            view = path.join(this.name, this.action);
        }

        this.res.render(view, model);
    };

     this.jsonError =  function(message){

         _self.res.jsonp({
            success:false,
            message:message
        });
    }

     this.jsonSuccess =  function(data){
         _self.res.jsonp({
            success:true,
            data:data
        });
    }
});


module.exports = Controller;

