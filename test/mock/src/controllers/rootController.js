"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
let RootController = class RootController extends route_1.StaticController {
    all(req, res, route) {
        res.json({ name: route.actionName });
    }
    root(req, res, model, route) {
        res.json({ name: route.actionName });
    }
    raw(req, res, model, route) {
        res.end(route.actionName);
    }
};
tslib_1.__decorate([
    route_1.get("/")
], RootController.prototype, "root", null);
tslib_1.__decorate([
    route_1.get("/raw")
], RootController.prototype, "raw", null);
RootController = tslib_1.__decorate([
    route_1.controller()
], RootController);
exports.RootController = RootController;
//# sourceMappingURL=rootController.js.map