"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_utils_1 = require("appolo-utils");
const util_1 = require("../util/util");
let orderIndex = 0;
class Route {
    constructor(controller) {
        this._controller = controller;
        this._route = {
            method: [],
            roles: [],
            environments: [],
            middleware: [],
            middlewareError: [],
            controller: util_1.Util.getControllerName(controller),
            path: [],
            order: orderIndex++,
            params: {},
            action: null,
            definition: null,
            headers: [],
            statusCode: 0,
            gzip: false,
            customRouteFn: [],
            customRouteParam: [],
            hooks: {
                preHandler: [],
                preMiddleware: [],
                onResponse: [],
                onRequest: [],
                onError: [],
                onSend: []
            }
        };
    }
    get definition() {
        return this._route;
    }
    path(pathPattern) {
        this._route.path.push(pathPattern);
        if (pathPattern == "/") {
            this.order(999998);
        }
        else if (pathPattern == "*") {
            this.order(999999);
        }
        return this;
    }
    order(order) {
        this._route.order = order;
        return this;
    }
    action(action) {
        this._route.action = action;
        return this;
    }
    abstract(abstract) {
        let items = appolo_utils_1.Objects.pick(abstract, "environments", "roles", "middleware", "convertToCamelCase", "params");
        Object.keys(items).forEach(key => {
            this[key](items[key]);
        });
        return this;
    }
    extend(opts) {
        Object.assign(this._route, opts);
        return this;
    }
    param(key, value) {
        this._route.params[key] = value;
        return this;
    }
    params(params) {
        appolo_utils_1.Objects.defaults(this._route.params, params || {});
        return this;
    }
    // public validation(key: string | { [index: string]: joi.Schema } | RouteModel, validation?: joi.Schema): this {
    //     return this.validations(key, validation);
    // }
    // public validations(key: string | { [index: string]: joi.Schema } | RouteModel, validation?: joi.Schema): this {
    //
    //     if (key.constructor && key.constructor.prototype === RouteModel.constructor.prototype && (key as any).prototype && (key as any).prototype.__validations__) {
    //         key = (key as any).prototype.__validations__
    //     }
    //
    //     if (_.isObject(key)) {
    //
    //         _.extend(this._route.validations, key)
    //
    //     } else {
    //
    //         this._route.validations[key as string] = validation
    //     }
    //
    //     return this;
    // }
    method(method) {
        this._route.method.push(method);
        return this;
    }
    environment(environment) {
        return this.environments(environment);
    }
    environments(environment) {
        if (Array.isArray(environment)) {
            this._route.environments.push.apply(this._route.environments, environment);
        }
        else {
            this._route.environments.push(environment);
        }
        return this;
    }
    convertToCamelCase(value) {
        this._route.convertToCamelCase = value;
        return this;
    }
    error(middleware, order = "tail") {
        return this._addMiddleware(middleware, order, true);
    }
    middleware(middleware, order = "tail") {
        return this._addMiddleware(middleware, order, false);
    }
    _addMiddleware(middleware, order = "tail", error = false) {
        let arrMethod = order == "head" ? "unshift" : "push";
        //
        if (Array.isArray(middleware)) {
            return this.middlewares(middleware, order);
        }
        let middle = middleware;
        if (appolo_utils_1.Objects.isPlain(middle) && (middle.order && middle.middleware)) {
            return this.middleware(middle.middleware, middle.order);
        }
        let id = util_1.Util.getClassId(middle);
        if (id) {
            middleware = id;
        }
        error ? this._route.middlewareError[arrMethod](middleware) : this._route.middleware[arrMethod](middleware);
        return this;
    }
    middlewares(middlewares, order = "tail") {
        appolo_utils_1.Arrays.arrayify(middlewares).forEach(fn => this.middleware(fn, order));
        return this;
    }
    addHook(name, ...hook) {
        this._route.hooks[name].push(...hook);
        return this;
    }
    role(role) {
        return this.roles(role);
    }
    roles(role) {
        if (Array.isArray(role)) {
            this._route.roles.push.apply(this._route.roles, role);
        }
        else {
            this._route.roles.push(role);
        }
        return this;
    }
    gzip() {
        this._route.gzip = true;
        return this;
    }
    headers(key, value) {
        this._route.headers.push({ key: key, value: value });
        return this;
    }
    customRouteFn(fn) {
        this._route.customRouteFn.push(fn);
        return this;
    }
    customRouteParam(index, fn) {
        this._route.customRouteParam.push({ index, fn });
        this._route.customRouteParam = appolo_utils_1.Arrays.sortBy(this._route.customRouteParam, data => data.index);
        return this;
    }
    statusCode(code) {
        this._route.statusCode = code;
        return this;
    }
    clone() {
        let route = new Route(this._controller);
        route._route = appolo_utils_1.Objects.cloneDeep(this._route);
        return route;
    }
}
exports.Route = Route;
//# sourceMappingURL=route.js.map