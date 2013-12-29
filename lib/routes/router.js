"use strict";

var Class = require('../class/class'),
    _ = require('lodash'),
    spring = require('../spring/spring');

var Router = Class.define(function(){

    var self,
        http,
        defaults = {
            controllerSuffix: 'Controller',
            actionSuffix: 'Action'
        };

    this.constructor = function(){

        self = this;
    };

    this.initialize = function(options){
        http = options.app;

        _.extend(defaults, options || {});

        options.routes.forEach(createRoute)
    };

    function createRoute(route){

        var method = route.method || "get",
            middleware = route.middleware || [];

        if(route.path) {
            http[method].apply(http, [route.path].concat([createController.bind(self, route)], middleware, [initializeController.bind(self, route)]));
        }
    };

    function createController(route, req, res, next){
        res.controller = spring.getObject(route.controller + defaults.controllerSuffix, [req, res, next, route.controller]);

        if(!res.controller) {
            throw new Error("failed to find controller " + route.controller);
        }

        if(route.locals) {
            _.extend(res.locals, route.locals);
        }

        res.controller.initialize();

        next();
    }

    function initializeController(route, req, res, next){
        res.controller.invoke(route.action);
    }


});


module.exports = new Router();