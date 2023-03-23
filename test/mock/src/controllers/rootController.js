"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
let RootController = class RootController extends route_1.StaticController {
    all(req, res, route) {
        res.json({ name: route.actionName });
    }
    root(req, res, route) {
        res.json({ name: route.actionName });
    }
    raw(req, res, route) {
        res.end(route.actionName);
    }
};
tslib_1.__decorate([
    (0, route_1.get)("/"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RootController.prototype, "root", null);
tslib_1.__decorate([
    (0, route_1.get)("/raw"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RootController.prototype, "raw", null);
RootController = tslib_1.__decorate([
    (0, route_1.controller)()
], RootController);
exports.RootController = RootController;
//# sourceMappingURL=rootController.js.map