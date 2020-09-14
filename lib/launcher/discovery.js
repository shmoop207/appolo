"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discovery = void 0;
const engine_1 = require("@appolo/engine");
const route_1 = require("@appolo/route");
class Discovery extends engine_1.Discovery {
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
    getRouteDefinition(fn, action) {
        return Discovery.getRouteDefinition(fn, action);
    }
    static getRouteDefinition(fn, action) {
        return route_1.Util.getRouteDefinition(fn, action);
    }
    createRouteDefinition(fn, action) {
        return Discovery.createRouteDefinition(fn, action);
    }
    static createRouteDefinition(fn, action) {
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