"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoratorRouteController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
let DecoratorRouteController = class DecoratorRouteController extends route_1.StaticController {
    test(req, res) {
        res.json({ model: this.getModel(req) });
    }
    test2(req, res) {
        res.json({ model: this.getModel(req) });
    }
};
tslib_1.__decorate([
    inject_1.inject()
], DecoratorRouteController.prototype, "manager", void 0);
tslib_1.__decorate([
    route_1.get("/test/decorator/route/:name/:name2")
], DecoratorRouteController.prototype, "test", null);
tslib_1.__decorate([
    route_1.get("/test/decorator2/route/:name/:name2")
], DecoratorRouteController.prototype, "test2", null);
DecoratorRouteController = tslib_1.__decorate([
    route_1.controller(),
    inject_1.singleton(),
    inject_1.lazy()
], DecoratorRouteController);
exports.DecoratorRouteController = DecoratorRouteController;
//# sourceMappingURL=decoratorRouteController.js.map