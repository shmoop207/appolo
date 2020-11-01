"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discovery = void 0;
const engine_1 = require("@appolo/engine");
const route_1 = require("@appolo/route");
class Discovery extends engine_1.Discovery {
    constructor(app, engineDiscovery) {
        super(app);
        this._exported = engineDiscovery.exported;
    }
    getControllerName(controller) {
        return Discovery.getControllerName(controller);
    }
    static getControllerName(controller) {
        return route_1.Util.getControllerName(controller);
    }
    decorateRequest(name, fn) {
        return Discovery.decorateRequest(name, fn);
    }
    static decorateRequest(name, fn) {
        route_1.Util.decorateRequest(name, fn);
    }
    decorateResponse(name, fn) {
        return Discovery.decorateResponse(name, fn);
    }
    static decorateResponse(name, fn) {
        route_1.Util.decorateResponse(name, fn);
    }
    getRoute(fn, action) {
        return Discovery.getRoute(fn, action);
    }
    static getRoute(fn, action) {
        return route_1.Util.getRouteDefinition(fn, action);
    }
    createRoute(fn, action) {
        return Discovery.createRoute(fn, action);
    }
    static createRoute(fn, action) {
        return route_1.Util.createRouteDefinition(fn, action);
    }
    isController(fn) {
        return Discovery.isController(fn);
    }
    static isController(fn) {
        return route_1.Util.isController(fn);
    }
}
exports.Discovery = Discovery;
//# sourceMappingURL=discovery.js.map