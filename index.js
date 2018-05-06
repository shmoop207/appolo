"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const validator = require("joi");
exports.validator = validator;
const app_1 = require("./lib/app");
const appolo_engine_1 = require("appolo-engine");
exports.factory = appolo_engine_1.factory;
exports.inject = appolo_engine_1.inject;
exports.initMethod = appolo_engine_1.initMethod;
exports.injectParam = appolo_engine_1.injectParam;
exports.injectFactory = appolo_engine_1.injectFactory;
exports.injectFactoryMethod = appolo_engine_1.injectFactoryMethod;
exports.alias = appolo_engine_1.alias;
exports.aliasFactory = appolo_engine_1.aliasFactory;
exports.injectValue = appolo_engine_1.injectValue;
exports.injectObjectProperty = appolo_engine_1.injectObjectProperty;
exports.injectDictionary = appolo_engine_1.injectDictionary;
exports.injectArray = appolo_engine_1.injectArray;
exports.injectAlias = appolo_engine_1.injectAlias;
exports.injectAliasFactory = appolo_engine_1.injectAliasFactory;
exports.define = appolo_engine_1.define;
exports.singleton = appolo_engine_1.singleton;
exports.EventDispatcher = appolo_engine_1.EventDispatcher;
exports.Util = appolo_engine_1.Util;
exports.lazy = appolo_engine_1.lazy;
exports.module = appolo_engine_1.module;
exports.Module = appolo_engine_1.Module;
exports.Injector = appolo_engine_1.Injector;
exports.bootstrap = appolo_engine_1.bootstrap;
var route_1 = require("./lib/routes/route");
exports.Route = route_1.Route;
var controller_1 = require("./lib/controller/controller");
exports.Controller = controller_1.Controller;
var staticController_1 = require("./lib/controller/staticController");
exports.StaticController = staticController_1.StaticController;
tslib_1.__exportStar(require("./lib/decorators/decorators"), exports);
var middleware_1 = require("./lib/middleware/middleware");
exports.Middleware = middleware_1.Middleware;
var staticMiddleware_1 = require("./lib/middleware/staticMiddleware");
exports.StaticMiddleware = staticMiddleware_1.StaticMiddleware;
var app_2 = require("./lib/app");
exports.App = app_2.App;
var routeModel_1 = require("./lib/routes/routeModel");
exports.RouteModel = routeModel_1.RouteModel;
var appolo_agent_1 = require("appolo-agent");
exports.Methods = appolo_agent_1.Methods;
exports.HttpError = appolo_agent_1.HttpError;
function createApp(options) {
    return new app_1.App(options);
}
exports.createApp = createApp;
function default_1(options) {
    return new app_1.App(options);
}
exports.default = default_1;
;
//# sourceMappingURL=index.js.map