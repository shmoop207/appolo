"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_agent_1 = require("appolo-agent");
const IMiddleware_1 = require("../interfaces/IMiddleware");
const invokeActionMiddleware_1 = require("./invokeActionMiddleware");
const util_1 = require("../util/util");
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
        this._routes.forEach(route => this._initRoute(route));
    }
    getRoute(path, method) {
        return this._routes.find(route => route.definition.path.includes(path) && route.definition.method.includes(method));
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
        //check if we have valid path
        if (!def.path.length || !def.action || (def.environments.length && def.environments.indexOf(this._env.name || this._env.type) == -1)) {
            return;
        }
        def.controllerName = def.controller.replace(this.controllerSuffix, '');
        def.definition = this._injector.getDefinition(def.controller);
        let middewares = util_1.Util.convertMiddleware(def.middleware, IMiddleware_1.MiddlewareType.MiddleWare).concat(util_1.Util.convertMiddleware(def.middlewareError, IMiddleware_1.MiddlewareType.Error));
        if (def.gzip || def.statusCode || def.headers.length || def.customRouteFn.length) {
            middewares.unshift(invokeActionMiddleware_1.invokeCustomRouteMiddleWare);
        }
        // if (!_.isEmpty(def.validations)) {
        //     middewares.unshift(checkValidationMiddleware);
        // }
        middewares.push(invokeActionMiddleware_1.invokeActionMiddleware);
        let hooks = {};
        Object.keys(def.hooks || {}).forEach(key => {
            let hook = def.hooks[key];
            hooks[key] = util_1.Util.convertMiddlewareHooks(key, hook);
        });
        for (let i = 0, len = def.path.length; i < len; i++) {
            this._agent.add(def.method[i] || appolo_agent_1.Methods.GET, def.path[i], middewares, def, hooks);
        }
    }
    reset() {
        this._routes.length = 0;
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map