"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
let ViewController = class ViewController extends route_1.StaticController {
    async raw(req, res, route) {
        await res.render({ test: req.query.test });
    }
    async view2(req, res, route) {
        await res.render("raw2", { test: req.query.test });
    }
};
tslib_1.__decorate([
    route_1.get("/test/view")
], ViewController.prototype, "raw", null);
tslib_1.__decorate([
    route_1.get("/test/view2")
], ViewController.prototype, "view2", null);
ViewController = tslib_1.__decorate([
    route_1.controller()
], ViewController);
exports.ViewController = ViewController;
//# sourceMappingURL=viewController.js.map