"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const route_1 = require("../routes/route");
const appolo_agent_1 = require("appolo-agent");
const routeModel_1 = require("../routes/routeModel");
exports.RouterDefinitionsSymbol = Symbol("__RouterDefinitions__");
function defineRouteProperty(params) {
    return function (params, target, propertyKey, descriptor) {
        let data = Reflect.getOwnMetadata(exports.RouterDefinitionsSymbol, target.constructor) || _.cloneDeep(Reflect.getMetadata(exports.RouterDefinitionsSymbol, target.constructor));
        if (!data) {
            data = {};
            Reflect.defineMetadata(exports.RouterDefinitionsSymbol, data, target.constructor);
        }
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
    if (key.constructor && key.constructor.prototype === routeModel_1.RouteModel.constructor.prototype && key.prototype && key.prototype.__validations__) {
        key = key.prototype.__validations__;
    }
    return defineRouteProperty([{ name: "validation", args: [key, validation] }]);
}
exports.validation = validation;
function validationParam(validation) {
    return function (target, propertyKey, descriptor) {
        if (target.constructor.prototype.__validations__ && !target.constructor.prototype.hasOwnProperty("__validations__")) {
            target.constructor.prototype.__validations__ = _.cloneDeep(target.constructor.prototype.__validations__);
        }
        let validations = target.constructor.prototype.__validations__ || (target.constructor.prototype.__validations__ = {});
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
// export function injectParam(name?: string) {
//     return function logParameter(target: any, propertyKey: string, index: number) {
//         let args = [];
//
//         // //we have a constructor
//         if (!propertyKey) {
//             if (target.prototype.__inject__) {
//                 args = appolo.Util.getFunctionArgs(target);
//                 target.prototype.__inject__.push({name: "args", args: [{ref: args[index]}]});
//             }
//             return;
//         }
//
//         args = appolo.Util.getFunctionArgs(target.constructor.prototype[propertyKey]);
//
//         if (!target.constructor.prototype.__param_inject__) {
//             target.constructor.prototype.__param_inject__ = []
//         }
//
//
//         target.constructor.prototype.__param_inject__.push({
//             param: name || args[index],
//             method: propertyKey,
//             index: index
//         })
//
//   }
//}
//# sourceMappingURL=decorators.js.map