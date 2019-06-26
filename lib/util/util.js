"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo = require("appolo-engine");
const _ = require("lodash");
const appolo_agent_1 = require("appolo-agent");
const IMiddleware_1 = require("../interfaces/IMiddleware");
const invokeActionMiddleware_1 = require("../routes/invokeActionMiddleware");
const decorators_1 = require("../decorators/decorators");
class Util extends appolo.Util {
    static convertSnakeCaseToCamelCase(str) {
        return str.replace(/(\_\w)/g, function (m) {
            return m[1].toUpperCase();
        });
    }
    static convertModelToCamelCase(model) {
        let keys = Object.keys(model);
        let output = {};
        for (let i = 0, len = keys.length; i < len; i++) {
            let key = keys[i];
            output[Util.convertSnakeCaseToCamelCase(key)] = model[key];
        }
        return output;
    }
    static isClass(v) {
        return typeof v === 'function' && v.name && /^\s*class\s+/.test(v.toString());
    }
    static reverseMiddleware(route) {
        _.forEach(route, (value, key) => {
            //we need to insert middlewares in reverse order
            if (key == "middleware") {
                route[key] = {
                    middleware: _.isArray(value) ? value.reverse() : value,
                    order: "head"
                };
            }
        });
    }
    static getControllerName(controller) {
        return _.isFunction(controller) && controller.name ? _.camelCase(controller.name) : controller;
    }
    static decorateRequest(name, fn) {
        appolo_agent_1.Request.prototype[name] = function () {
            return fn.apply(this, arguments);
        };
    }
    static decorateResponse(name, fn) {
        appolo_agent_1.Response.prototype[name] = function () {
            return fn.apply(this, arguments);
        };
    }
    static getRouteDefinition(fn, action) {
        action = _.isString(action) ? action : action(fn.prototype).name;
        let route = Reflect.getMetadata(decorators_1.RouterDefinitionsCompiledSymbol, fn, action);
        return route;
    }
    static isController(fn) {
        return Reflect.hasMetadata(decorators_1.RouterDefinitionsCompiledSymbol, fn);
    }
    static convertMiddleware(middleware, type) {
        let output = [];
        for (let i = 0, len = middleware.length; i < len; i++) {
            let dto = middleware[i];
            let id = Util.getClassId(middleware[i]);
            if (id) {
                dto = type == IMiddleware_1.MiddlewareType.MiddleWare ? invokeActionMiddleware_1.invokeMiddleWare(id) : type == IMiddleware_1.MiddlewareType.Error ? invokeActionMiddleware_1.invokeMiddleWareError(id) : invokeActionMiddleware_1.invokeMiddleWareData(id);
            }
            output.push(dto);
        }
        return output;
    }
    static convertMiddlewareHooks(name, hooks) {
        return Util.convertMiddleware(hooks, name == appolo_agent_1.Hooks.OnSend ? IMiddleware_1.MiddlewareType.Data : name == appolo_agent_1.Hooks.OnError ? IMiddleware_1.MiddlewareType.Error : IMiddleware_1.MiddlewareType.MiddleWare);
    }
}
exports.Util = Util;
//# sourceMappingURL=util.js.map