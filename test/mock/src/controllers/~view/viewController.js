"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo = require("../../../../../index");
const decorators_1 = require("../../../../../decorators");
let ViewController = class ViewController extends appolo.StaticController {
    async raw(req, res, route) {
        res.render({ test: req.query.test });
    }
    async view2(req, res, route) {
        res.render("raw2", { test: req.query.test });
    }
};
tslib_1.__decorate([
    decorators_1.pathGet("/test/view")
], ViewController.prototype, "raw", null);
tslib_1.__decorate([
    decorators_1.pathGet("/test/view2")
], ViewController.prototype, "view2", null);
ViewController = tslib_1.__decorate([
    decorators_1.define()
], ViewController);
exports.ViewController = ViewController;
//# sourceMappingURL=viewController.js.map