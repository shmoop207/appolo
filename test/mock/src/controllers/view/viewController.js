"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../../index");
let ViewController = class ViewController extends index_1.StaticController {
    async raw(req, res, route) {
        await res.render({ test: req.query.test });
    }
    async view2(req, res, route) {
        await res.render("raw2", { test: req.query.test });
    }
};
tslib_1.__decorate([
    index_1.get("/test/view")
], ViewController.prototype, "raw", null);
tslib_1.__decorate([
    index_1.get("/test/view2")
], ViewController.prototype, "view2", null);
ViewController = tslib_1.__decorate([
    index_1.controller()
], ViewController);
exports.ViewController = ViewController;
//# sourceMappingURL=viewController.js.map