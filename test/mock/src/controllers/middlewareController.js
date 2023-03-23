"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
const contextMiddleware_1 = require("../middleware/contextMiddleware");
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
    testContextMiddleware(req, res) {
        res.json({ working: req.user });
    }
};
tslib_1.__decorate([
    (0, inject_1.inject)(),
    tslib_1.__metadata("design:type", Object)
], MiddlewareController.prototype, "manager", void 0);
tslib_1.__decorate([
    (0, route_1.get)("/test/middleware/order"),
    (0, route_1.middleware)(function (req, res, next) {
        req.working = "working1";
        next();
    }),
    (0, route_1.middleware)(function (req, res, next) {
        (req).working2 = req.working + "working2";
        next();
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MiddlewareController.prototype, "testOrderMiddleware", null);
tslib_1.__decorate([
    (0, route_1.get)("/test/middleware/context"),
    (0, route_1.middleware)(contextMiddleware_1.ContextMiddleware.for({ test: 1 })),
    (0, route_1.middleware)(contextMiddleware_1.ContextMiddleware.for({ test2: 2 })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MiddlewareController.prototype, "testContextMiddleware", null);
MiddlewareController = tslib_1.__decorate([
    (0, route_1.controller)()
], MiddlewareController);
exports.MiddlewareController = MiddlewareController;
//# sourceMappingURL=middlewareController.js.map