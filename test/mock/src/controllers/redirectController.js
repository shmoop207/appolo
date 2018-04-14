"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let RedirectController = class RedirectController extends index_1.StaticController {
    redirect(req, res) {
        res.redirect("/test/redirectTo");
    }
    redirectTo(req, res, model, route) {
        res.json({ name: route.actionName });
    }
};
tslib_1.__decorate([
    index_1.pathGet("/test/redirect")
], RedirectController.prototype, "redirect", null);
tslib_1.__decorate([
    index_1.pathGet("/test/redirectTo")
], RedirectController.prototype, "redirectTo", null);
RedirectController = tslib_1.__decorate([
    index_1.controller()
], RedirectController);
exports.RedirectController = RedirectController;
//# sourceMappingURL=redirectController.js.map