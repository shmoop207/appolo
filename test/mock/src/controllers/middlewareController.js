"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let MiddlewareController = class MiddlewareController extends index_1.Controller {
    test(req, res) {
        res.json({ working: true });
    }
    fn(req, res) {
        res.json({ working: req.working });
    }
    testOrderMiddleware(req, res) {
        res.json({ working: req.working2 });
    }
};
tslib_1.__decorate([
    index_1.inject()
], MiddlewareController.prototype, "manager", void 0);
tslib_1.__decorate([
    index_1.pathGet("/test/middleware/order"),
    index_1.middleware(function (req, res, next) {
        req.working = "working1";
        next();
    }),
    index_1.middleware(function (req, res, next) {
        (req).working2 = req.working + "working2";
        next();
    })
], MiddlewareController.prototype, "testOrderMiddleware", null);
MiddlewareController = tslib_1.__decorate([
    index_1.controller()
], MiddlewareController);
exports.MiddlewareController = MiddlewareController;
//# sourceMappingURL=middlewareController.js.map