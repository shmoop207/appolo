"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const util_1 = require("../util/util");
const routeModel_1 = require("./routeModel");
let orderIndex = 0;
class Route {
    constructor(controller) {
        this._route = {
            method: [],
            roles: [],
            environments: [],
            middleware: [],
            validations: {},
            controller: _.isFunction(controller) && controller.name ? _.camelCase(controller.name) : controller,
            path: [],
            order: orderIndex++,
            params: {},
            action: null,
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
        let items = _.pick(abstract, ["environments", "roles", "middleware", "validations", "convertToCamelCase", "method", "params"]);
        _.forEach(items, (item, key) => {
            this[key](item);
        });
        return this;
    }
    extend(opts) {
        _.extend(this._route, opts);
        return this;
    }
    param(key, value) {
        this._route.params[key] = value;
        return this;
    }
    validation(key, validation) {
        return this.validations(key, validation);
    }
    validations(key, validation) {
        if (key.constructor && key.constructor.prototype === routeModel_1.RouteModel.constructor.prototype && key.prototype && key.prototype.__validations__) {
            key = key.prototype.__validations__;
        }
        if (_.isObject(key)) {
            _.extend(this._route.validations, key);
        }
        else {
            this._route.validations[key] = validation;
        }
        return this;
    }
    method(method) {
        this._route.method.push(method);
        return this;
    }
    environment(environment) {
        return this.environments(environment);
    }
    environments(environment) {
        if (_.isArray(environment)) {
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
    middleware(middleware, order = "tail") {
        let arrMethod = order == "head" ? "unshift" : "push";
        //
        if (_.isArray(middleware)) {
            return this.middlewares(middleware, order);
        }
        let middle = middleware;
        if (_.isPlainObject(middle) && (middle.order && middle.middleware)) {
            return this.middleware(middle.middleware, middle.order);
        }
        if (util_1.Util.isClass(middleware)) {
            middleware = _.camelCase(middleware.name);
        }
        this._route.middleware[arrMethod](middleware);
        // if (typeof middleware == "string") {
        //
        //     middleware = (function (middlewareId): MiddlewareHandler {
        //
        //         return function (req: IRequest, res: IResponse, next: NextFn) {
        //
        //             let middleware: IMiddleware = appolo.inject.getObject<IMiddleware>(middlewareId, [req, res, next, req.$route]);
        //
        //             if (!middleware) {
        //                 throw new Error("failed to find middleware " + middleware);
        //             }
        //
        //             middleware.run(req, res, next, req.route);
        //         }
        //     })(middleware);
        //
        //     this._route.middleware[arrMethod](middleware as MiddlewareHandler);
        // }
        return this;
    }
    middlewares(middlewares, order = "tail") {
        _.forEach(_.isArray(middlewares) ? middlewares : [middlewares], fn => this.middleware(fn, order));
        return this;
    }
    role(role) {
        return this.roles(role);
    }
    roles(role) {
        if (_.isArray(role)) {
            this._route.roles.push.apply(this._route.roles, role);
        }
        else {
            this._route.roles.push(role);
        }
        return this;
    }
}
exports.Route = Route;
//# sourceMappingURL=route.js.map