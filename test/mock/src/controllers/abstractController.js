"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildController = exports.BaseController = exports.Abstract3Controller = exports.Abstract2Controller = exports.AbstractController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
let AbstractController = class AbstractController extends route_1.Controller {
    test(req, res) {
        res.json({ working: req.working3 });
    }
};
tslib_1.__decorate([
    (0, inject_1.inject)(),
    tslib_1.__metadata("design:type", Object)
], AbstractController.prototype, "manager", void 0);
tslib_1.__decorate([
    (0, route_1.middleware)(function (req, res, next) {
        (req).working3 = req.working + req.working2 + "working3";
        next();
    }),
    (0, route_1.get)("abstract"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AbstractController.prototype, "test", null);
AbstractController = tslib_1.__decorate([
    (0, route_1.middleware)(function (req, res, next) {
        req.working = "working1";
        next();
    }),
    (0, route_1.middleware)(function (req, res, next) {
        req.working2 = "working2";
        next();
    })
], AbstractController);
exports.AbstractController = AbstractController;
let Abstract2Controller = class Abstract2Controller extends AbstractController {
    test(req, res) {
        super.test(req, res);
    }
};
tslib_1.__decorate([
    (0, inject_1.inject)(),
    tslib_1.__metadata("design:type", Object)
], Abstract2Controller.prototype, "manager", void 0);
Abstract2Controller = tslib_1.__decorate([
    (0, route_1.controller)("test")
], Abstract2Controller);
exports.Abstract2Controller = Abstract2Controller;
let Abstract3Controller = class Abstract3Controller extends AbstractController {
    test(req, res) {
        req.working3 += "fromTest2";
        super.test(req, res);
    }
};
tslib_1.__decorate([
    (0, inject_1.inject)(),
    tslib_1.__metadata("design:type", Object)
], Abstract3Controller.prototype, "manager", void 0);
Abstract3Controller = tslib_1.__decorate([
    (0, route_1.controller)("test2"),
    (0, inject_1.singleton)()
], Abstract3Controller);
exports.Abstract3Controller = Abstract3Controller;
let BaseController = class BaseController extends route_1.Controller {
    test(req, res) {
        res.json({ working: req.working });
    }
};
tslib_1.__decorate([
    (0, route_1.get)("/child_controller"),
    (0, route_1.middleware)(function (req, res, d) {
        req.working += "working4";
        d();
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], BaseController.prototype, "test", null);
BaseController = tslib_1.__decorate([
    (0, route_1.middleware)(function (req, res, a) {
        req.working += "working1";
        a();
    })
], BaseController);
exports.BaseController = BaseController;
let ChildController = class ChildController extends BaseController {
    test(req, res) {
        super.test(req, res);
    }
};
tslib_1.__decorate([
    (0, route_1.middleware)(function (req, res, e) {
        req.working += "working5";
        e();
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ChildController.prototype, "test", null);
ChildController = tslib_1.__decorate([
    (0, route_1.controller)(),
    (0, inject_1.singleton)(),
    (0, route_1.middleware)(function (req, res, b) {
        req.working += "working2";
        b();
    }),
    (0, route_1.middleware)(function (req, res, c) {
        req.working += "working3";
        c();
    })
], ChildController);
exports.ChildController = ChildController;
//# sourceMappingURL=abstractController.js.map