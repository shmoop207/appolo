"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
let MiddlewareController = class MiddlewareController extends route_1.Controller {
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
    inject_1.inject()
], MiddlewareController.prototype, "manager", void 0);
tslib_1.__decorate([
    route_1.get("/test/middleware/order"),
    route_1.middleware(function (req, res, next) {
        req.working = "working1";
        next();
    }),
    route_1.middleware(function (req, res, next) {
        (req).working2 = req.working + "working2";
        next();
    })
], MiddlewareController.prototype, "testOrderMiddleware", null);
MiddlewareController = tslib_1.__decorate([
    route_1.controller()
], MiddlewareController);
exports.MiddlewareController = MiddlewareController;
//# sourceMappingURL=middlewareController.js.map