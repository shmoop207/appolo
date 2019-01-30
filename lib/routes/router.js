"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const appolo_agent_1 = require("appolo-agent");
const invokeActionMiddleware_1 = require("./invokeActionMiddleware");
const checkValidationMiddleware_1 = require("./checkValidationMiddleware");
class Router {
    constructor(_env, _injector, _options, _agent) {
        this._env = _env;
        this._injector = _injector;
        this._options = _options;
        this._agent = _agent;
        this.controllerSuffix = 'Controller';
        this.actionSuffix = 'Action';
        this._isInitialize = false;
        this._routes = [];
    }
    initialize() {
        this._isInitialize = true;
        _.forEach(this._routes, route => this._initRoute(route));
    }
    addRoute(route) {
        this._routes.push(route);
        if (this._isInitialize) {
            setImmediate(() => this._initRoute(route));
        }
    }
    _initRoute(route) {
        let def = route.definition;
        if (def.$initialized) {
            return;
        }
        def.$initialized = true;
        let middleware = _.clone(def.middleware);
        //check if we have valid path
        if (!def.path.length || !def.action || (def.environments.length && !_.includes(def.environments, (this._env.name || this._env.type)))) {
            return;
        }
        def.controllerName = def.controller.replace(this.controllerSuffix, '');
        def.definition = this._injector.getDefinition(def.controller);
        this._convertStrMiddleware(middleware);
        if (!_.isEmpty(def.validations)) {
            middleware.unshift(checkValidationMiddleware_1.checkValidationMiddleware);
        }
        middleware.push(invokeActionMiddleware_1.invokeActionMiddleware);
        for (let i = 0, len = def.path.length; i < len; i++) {
            this._agent.add(def.method[i] || appolo_agent_1.Methods.GET, def.path[i], middleware, def);
        }
    }
    _convertStrMiddleware(middleware) {
        for (let i = 0, len = middleware.length; i < len; i++) {
            if (_.isString(middleware[i])) {
                middleware[i] = this._invokeMiddleWare.bind(this, middleware[i]);
            }
        }
    }
    _invokeMiddleWare(middlewareId, req, res, next) {
        let middleware = this._injector.getObject(middlewareId, [req, res, next, req.route]);
        if (!middleware) {
            next(new appolo_agent_1.HttpError(500, `failed to find middleware ${middlewareId}`));
        }
        middleware.run(req, res, next, req.route);
    }
    reset() {
        this._routes.length = 0;
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map