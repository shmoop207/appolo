"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const route_1 = require("@appolo/route");
class Route {
    constructor(_launcher) {
        this._launcher = _launcher;
        this.handle = (request, response) => {
            this._launcher.agent.handle(request, response);
        };
    }
    use(path, ...middleware) {
        this._launcher.router.addMiddleware(path, middleware, false);
        return this;
    }
    error(path, ...middleware) {
        this._launcher.router.addMiddleware(path, middleware, true);
        return this;
    }
    getRoute(path, method) {
        return this._launcher.router.getRoute(path, method);
    }
    getRoutesByController(fn, action) {
        return this.getRoutes().find(route => route.definition.controller === fn && (action ? route.definition.actionName == action : true));
    }
    getRoutes() {
        return this._launcher.router.routes;
    }
    get hooks() {
        return this._launcher.router.hooks;
    }
    createRoute(controller) {
        let route = new route_1.Route(controller);
        this._launcher.router.addRoute(route);
        return route;
    }
    createRouteFromClass(klass) {
        this._launcher.router.addRouteFromClass(klass);
    }
    get(path, ...handler) {
        this._launcher.agent.get(path, ...handler);
        return this;
    }
    post(path, ...handler) {
        this._launcher.agent.post(path, ...handler);
        return this;
    }
    delete(path, ...handler) {
        this._launcher.agent.post(path, ...handler);
        return this;
    }
    patch(path, ...handler) {
        this._launcher.agent.patch(path, ...handler);
        return this;
    }
    get server() {
        return this._launcher.agent.server;
    }
    startServer() {
        return this._launcher.startServer();
    }
    get port() {
        return this._launcher.port;
    }
    get isServerRunning() {
        return this._launcher.isServerRunning;
    }
}
exports.Route = Route;
//# sourceMappingURL=route.js.map