"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const route_1 = require("../routes/route");
const appolo_agent_1 = require("appolo-agent");
const routeModel_1 = require("../routes/routeModel");
const util_1 = require("../util/util");
exports.RouterDefinitionsSymbol = Symbol("__RouterDefinitions__");
exports.RouterModelSymbol = Symbol("__RouterModelDefinitions__");
function defineRouteProperty(params) {
    return function (params, target, propertyKey, descriptor) {
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
function path(path) {
    return defineRouteProperty([{ name: "path", args: [path] }]);
}
exports.path = path;
function pathGet(path) {
    return defineRouteProperty([{ name: "path", args: [path] }, { name: "method", args: [appolo_agent_1.Methods.GET] }]);
}
exports.pathGet = pathGet;
function pathPost(path) {
    return defineRouteProperty([{ name: "path", args: [path] }, { name: "method", args: [appolo_agent_1.Methods.POST] }]);
}
exports.pathPost = pathPost;
function pathPatch(path) {
    return defineRouteProperty([{ name: "path", args: [path] }, { name: "method", args: [appolo_agent_1.Methods.PATCH] }]);
}
exports.pathPatch = pathPatch;
function pathPut(path) {
    return defineRouteProperty([{ name: "path", args: [path] }, { name: "method", args: [appolo_agent_1.Methods.PUT] }]);
}
exports.pathPut = pathPut;
function pathDelete(path) {
    return defineRouteProperty([{ name: "path", args: [path] }, { name: "method", args: [appolo_agent_1.Methods.DELETE] }]);
}
exports.pathDelete = pathDelete;
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
    _.forEach(route, (value, key) => {
        //we need to insert middlewares in reverse order
        if (key == "middleware") {
            route[key] = { middleware: _.isArray(value) ? value.reverse() : value, order: "head" };
        }
    });
    return defineRouteProperty([{ name: "abstract", args: [route] }]);
}
exports.abstract = abstract;
function roles(role) {
    return defineRouteProperty([{ name: "roles", args: [role] }]);
}
exports.roles = roles;
//# sourceMappingURL=decorators.js.map