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
    route_1.get("/test/view"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ViewController.prototype, "raw", null);
tslib_1.__decorate([
    route_1.get("/test/view2"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ViewController.prototype, "view2", null);
ViewController = tslib_1.__decorate([
    route_1.controller()
], ViewController);
exports.ViewController = ViewController;
//# sourceMappingURL=viewController.js.map