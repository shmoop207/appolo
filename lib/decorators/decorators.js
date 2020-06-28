"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.res = exports.req = exports.params = exports.model = exports.query = exports.headers = exports.body = exports.customRouteParam = exports.customRouteDecorator = exports.statusCode = exports.header = exports.gzip = exports.roles = exports.abstract = exports.error = exports.middleware = exports.hook = exports.method = exports.purge = exports.del = exports.put = exports.patch = exports.post = exports.get = exports.controller = exports.RouterControllerSymbol = exports.RouterModelSymbol = exports.RouterDefinitionsClassSymbol = exports.RouterDefinitionsCompiledSymbol = exports.RouterDefinitionsSymbol = void 0;
const route_1 = require("../routes/route");
const appolo_agent_1 = require("appolo-agent");
const appolo_engine_1 = require("appolo-engine");
const appolo_utils_1 = require("appolo-utils");
const util_1 = require("../util/util");
exports.RouterDefinitionsSymbol = "__RouterDefinitions__";
exports.RouterDefinitionsCompiledSymbol = "__RouterDefinitionsCompiled__";
exports.RouterDefinitionsClassSymbol = "__RouterDefinitionsClass__";
exports.RouterModelSymbol = "__RouterModelDefinitions__";
exports.RouterControllerSymbol = "__RouterControllerDefinitions__";
function defineRouteClass(params, target) {
    let route = appolo_utils_1.Reflector.getFnMetadata(exports.RouterDefinitionsClassSymbol, target, new route_1.Route(target));
    route = route.clone();
    (params || []).forEach(param => {
        route[param.name].apply(route, param.args);
    });
    appolo_utils_1.Reflector.setMetadata(exports.RouterDefinitionsClassSymbol, route, target);
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
        let data = appolo_utils_1.Reflector.getFnMetadata(exports.RouterDefinitionsSymbol, target.constructor, {});
        let route = data[propertyKey];
        if (!route) {
            data[propertyKey] = route = new route_1.Route(target.constructor);
            route.action(propertyKey);
        }
        else {
            route = data[propertyKey] = route.clone();
        }
        (params || []).forEach(param => {
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
function purge(path) {
    return defineRouteProperty([{ name: "path", args: [path || ""] }, { name: "method", args: [appolo_agent_1.Methods.PURGE] }]);
}
exports.purge = purge;
function method(method) {
    return defineRouteProperty([{ name: "method", args: [method] }]);
}
exports.method = method;
function hook(name, ...hook) {
    return defineRouteProperty([{ name: "addHook", args: [name, ...hook] }]);
}
exports.hook = hook;
function middleware(middleware) {
    if (Array.isArray(middleware)) {
        middleware = appolo_utils_1.Arrays.clone(middleware).reverse();
    }
    return defineRouteProperty([{ name: "middleware", args: [middleware, "head"] }]);
}
exports.middleware = middleware;
function error(middleware) {
    if (Array.isArray(middleware)) {
        middleware = appolo_utils_1.Arrays.clone(middleware).reverse();
    }
    return defineRouteProperty([{ name: "error", args: [middleware, "head"] }]);
}
exports.error = error;
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
function header(key, value) {
    return defineRouteProperty([{ name: "headers", args: [key, value] }]);
}
exports.header = header;
function statusCode(code) {
    return defineRouteProperty([{ name: "statusCode", args: [code] }]);
}
exports.statusCode = statusCode;
function customRouteDecorator(fn) {
    return defineRouteProperty([{ name: "customRouteFn", args: [fn] }]);
}
exports.customRouteDecorator = customRouteDecorator;
function customRouteParam(fn) {
    return function (target, propertyKey, parameterIndex) {
        defineRouteProperty([{ name: "customRouteParam", args: [parameterIndex, fn] }])(target, propertyKey);
    };
}
exports.customRouteParam = customRouteParam;
exports.body = function (param) {
    return customRouteParam(function (req) {
        return param != undefined ? req.body[param] : req.body;
    });
};
exports.headers = function (param) {
    return customRouteParam(function (req) {
        return param != undefined ? req.headers[param] : req.headers;
    });
};
exports.query = function (param) {
    return customRouteParam(function (req) {
        return param != undefined ? req.query[param] : req.query;
    });
};
exports.model = function (param) {
    return customRouteParam(function (req) {
        if (!req.model) {
            req.model = Object.assign({}, req.body || {}, req.query || {}, req.params || {});
        }
        return param != undefined ? req.model[param] : req.model;
    });
};
exports.params = function (param) {
    return customRouteParam(function (req) {
        return param != undefined ? req.params[param] : req.params;
    });
};
exports.req = function () {
    return customRouteParam(function (req) {
        return req;
    });
};
exports.res = function () {
    return customRouteParam(function (req, res) {
        return res;
    });
};
//# sourceMappingURL=decorators.js.map