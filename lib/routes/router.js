"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const joi = require("joi");
const appolo_agent_1 = require("appolo-agent");
class Router {
    constructor(_env, _injector, _options, _agent) {
        this._env = _env;
        this._injector = _injector;
        this._options = _options;
        this._agent = _agent;
        this.controllerSuffix = 'Controller';
        this.actionSuffix = 'Action';
        this._invokeAction = (req, res, next) => {
            try {
            }
            catch (e) {
            }
            let route = req.route;
            let controller = this._injector.getObject(route.controller, [req, res, route]);
            if (!controller) {
                next(new appolo_agent_1.HttpError(500, `failed to find controller ${route.controller}`));
                return;
            }
            let fnName = route.actionName;
            if (!fnName) {
                fnName = _.isString(route.action) ? route.action : route.action(controller).name;
                if (!controller[fnName]) {
                    next(new appolo_agent_1.HttpError(500, `failed to invoke ${this.constructor.name} fnName ${fnName}`));
                    return;
                }
                route.actionName = fnName;
            }
            let result = controller[fnName](req, res, req.model, route);
            if (result && result.then && result.catch) {
                result.then(data => {
                    if (!res.headersSent) {
                        res.send(data);
                    }
                }).catch((e) => {
                    res.status(500).json({
                        status: 500,
                        statusText: "Internal Server Error",
                    });
                });
            }
        };
        this._checkValidation = (req, res, next) => {
            let data = _.extend({}, req.params, req.query, req.body);
            joi.validate(data, req.route.validations, this._options.validatorOptions, function (e, params) {
                if (e) {
                    next(new appolo_agent_1.HttpError(400, e.toString(), {
                        status: 400,
                        statusText: "Bad Request",
                        error: e.toString(),
                        code: 400
                    }));
                    return;
                }
                req.model = params;
                next();
            });
        };
        this._routes = [];
    }
    initialize() {
        _.forEach(this._routes, route => this._initRoute(route));
    }
    addRoute(route) {
        this._routes.push(route);
        if (route.definition.action && route.definition.path.length) {
            this._initRoute(route);
        }
        else {
            setImmediate(() => this._initRoute(route));
        }
    }
    _initRoute(route) {
        let def = route.definition;
        let middleware = _.clone(def.middleware);
        //check if we have valid path
        if (!def.path.length || !def.action || (def.environments.length && !_.includes(def.environments, (this._env.name || this._env.type)))) {
            return;
        }
        def.controllerName = def.controller.replace(this.controllerSuffix, '');
        this._convertStrMiddleware(middleware);
        middleware.push(this._invokeAction);
        if (!_.isEmpty(def.validations)) {
            middleware.unshift(this._checkValidation);
        }
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