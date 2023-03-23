"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedirectController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
let RedirectController = class RedirectController extends route_1.StaticController {
    redirect(req, res) {
        res.redirect("/test/redirectTo");
    }
    redirectTo(req, res, route) {
        res.json({ name: route.actionName });
    }
};
tslib_1.__decorate([
    (0, route_1.get)("/test/redirect"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RedirectController.prototype, "redirect", null);
tslib_1.__decorate([
    (0, route_1.get)("/test/redirectTo"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RedirectController.prototype, "redirectTo", null);
RedirectController = tslib_1.__decorate([
    (0, route_1.controller)()
], RedirectController);
exports.RedirectController = RedirectController;
//# sourceMappingURL=redirectController.js.map