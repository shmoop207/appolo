"use strict";
var Class = require('appolo-class'),
    appolo = require('appolo'),
    _ = require('lodash');

 var Router= Class.define({

    constructor: function () {

        this._defaults = {
            controllerSuffix: 'Controller',
            actionSuffix: 'Action'
        }
    },

    initialize: function (app,routes,options) {
        this._http = app;

        this._routes = routes;

        this._config = _.extend({}, this._defaults, options || {});

        _.forEach(this._routes,this._createRoute,this);
    },

    _createRoute: function (route) {

        var method = route.method || "get",
            middleware = route.middleware || [];

        if (route.path) {

            var args = [route.path, this._createController.bind(this, route)]
                .concat(middleware,[this._invokeAction.bind(this, route)]);

            this._http[method].apply(this._http, args);
        }
    },

    _createController: function (route, req, res, next) {

        res.controller = appolo.inject.getObject(route.controller + this._config.controllerSuffix, [req, res, next, route.controller]);

        if (!res.controller) {
            throw new Error("failed to find controller " + route.controller);
        }

        if (route.locals) {
            _.extend(res.locals, route.locals);
        }

        res.controller.initialize();

        next();
    },

    _invokeAction: function (route, req, res, next) {
        res.controller.invoke(route.action);
    }
});


module.exports = new Router();