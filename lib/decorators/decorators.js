"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const route_1 = require("../routes/route");
const appolo_agent_1 = require("appolo-agent");
const appolo_engine_1 = require("appolo-engine");
const routeModel_1 = require("../routes/routeModel");
const util_1 = require("../util/util");
exports.RouterDefinitionsSymbol = "__RouterDefinitions__";
exports.RouterDefinitionsClassSymbol = "__RouterDefinitionsClass__";
exports.RouterModelSymbol = "__RouterModelDefinitions__";
exports.RouterControllerSymbol = "__RouterControllerDefinitions__";
function defineRouteClass(params, target) {
    let route = util_1.Util.getReflectData(exports.RouterDefinitionsClassSymbol, target, new route_1.Route(target));
    _.forEach(params, param => {
        route[param.name].apply(route, param.args);
    });
}
function controller(name) {
    return function (name, target) {
        Reflect.defineMetadata(exports.RouterControllerSymbol, name || "", target);
        appolo_engine_1.define("")(target);
    }.bind(null, name);
}
exports.controller = controller;
function defineRouteProperty(params) {
    return function (params, target, propertyKey, descriptor) {
        if (!propertyKey) {
            defineRouteClass(params, target);
        }
        let data = util_1.Util.getReflectData(exports.RouterDefinitionsSymbol, target.constructor, {});
        let route = data[propertyKey];
        if (!route) {
            data[propertyKey] = route = new route_1.Route(target.constructor);
            route.action(propertyKey);
        }
        _.forEach(params, param => {
            route[param.name].apply(route, param.args);
        });
    }.bind(null, params);
}
//
// export function path(path: string): any {
//     return defineRouteProperty([{name: "path", args: [path]}, {name: "method", args: [Methods.GET]}])
//
// }
function get(path) {
    return defineRouteProperty([{ name: "path", args: [path || ""] }, { name: "method", args: [appolo_agent_1.Methods.GET] }]);
}
exports.get = get;
function post(path) {
    return defineRouteProperty([{ name: "path", args: [path || ""] }, { name: "method", args: [appolo_agent_1.Methods.POST] }]);
}
exports.post = post;
function patch(path) {
    return defineRouteProperty([{ name: "path", args: [path || ""] }, { name: "method", args: [appolo_agent_1.Methods.PATCH] }]);
}
exports.patch = patch;
function put(path) {
    return defineRouteProperty([{ name: "path", args: [path || ""] }, { name: "method", args: [appolo_agent_1.Methods.PUT] }]);
}
exports.put = put;
function del(path) {
    return defineRouteProperty([{ name: "path", args: [path || ""] }, { name: "method", args: [appolo_agent_1.Methods.DELETE] }]);
}
exports.del = del;
function method(method) {
    return defineRouteProperty([{ name: "method", args: [method] }]);
}
exports.method = method;
function middleware(middleware) {
    if (_.isArray(middleware)) {
        middleware = _(middleware).clone().reverse();
    }
    return defineRouteProperty([{ name: "middleware", args: [middleware, "head"] }]);
}
exports.middleware = middleware;
function error(middleware) {
    if (_.isArray(middleware)) {
        middleware = _(middleware).clone().reverse();
    }
    return defineRouteProperty([{ name: "error", args: [middleware, "head"] }]);
}
exports.error = error;
function validation(key, validation) {
    if (key.constructor && key.constructor.prototype === routeModel_1.RouteModel.constructor.prototype && key.prototype && Reflect.hasMetadata(exports.RouterModelSymbol, key)) {
        key = Reflect.getMetadata(exports.RouterModelSymbol, key);
    }
    return defineRouteProperty([{ name: "validation", args: [key, validation] }]);
}
exports.validation = validation;
function validationParam(validation) {
    return function (target, propertyKey, descriptor) {
        let validations = util_1.Util.getReflectData(exports.RouterModelSymbol, target.constructor, {});
        validations[propertyKey] = validation;
    };
}
exports.validationParam = validationParam;
function abstract(route) {
    util_1.Util.reverseMiddleware(route);
    return defineRouteProperty([{ name: "abstract", args: [route] }]);
}
exports.abstract = abstract;
function roles(role) {
    return defineRouteProperty([{ name: "roles", args: [role] }]);
}
exports.roles = roles;
function gzip() {
    return defineRouteProperty([{ name: "gzip", args: [] }]);
}
exports.gzip = gzip;
function headers(key, value) {
    return defineRouteProperty([{ name: "headers", args: [key, value] }]);
}
exports.headers = headers;
function statusCode(code) {
    return defineRouteProperty([{ name: "statusCode", args: [code] }]);
}
exports.statusCode = statusCode;
//# sourceMappingURL=decorators.js.map