"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildController = exports.BaseController = exports.Abstract3Controller = exports.Abstract2Controller = exports.AbstractController = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let AbstractController = class AbstractController extends index_1.Controller {
    test(req, res) {
        res.json({ working: req.working3 });
    }
};
tslib_1.__decorate([
    index_1.inject()
], AbstractController.prototype, "manager", void 0);
tslib_1.__decorate([
    index_1.middleware(function (req, res, next) {
        (req).working3 = req.working + req.working2 + "working3";
        next();
    }),
    index_1.get("abstract")
], AbstractController.prototype, "test", null);
AbstractController = tslib_1.__decorate([
    index_1.middleware(function (req, res, next) {
        req.working = "working1";
        next();
    }),
    index_1.middleware(function (req, res, next) {
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
    index_1.inject()
], Abstract2Controller.prototype, "manager", void 0);
Abstract2Controller = tslib_1.__decorate([
    index_1.controller("test")
], Abstract2Controller);
exports.Abstract2Controller = Abstract2Controller;
let Abstract3Controller = class Abstract3Controller extends AbstractController {
    test(req, res) {
        req.working3 += "fromTest2";
        super.test(req, res);
    }
};
tslib_1.__decorate([
    index_1.inject()
], Abstract3Controller.prototype, "manager", void 0);
Abstract3Controller = tslib_1.__decorate([
    index_1.controller("test2"),
    index_1.singleton()
], Abstract3Controller);
exports.Abstract3Controller = Abstract3Controller;
let BaseController = class BaseController extends index_1.Controller {
    test(req, res) {
        res.json({ working: req.working });
    }
};
tslib_1.__decorate([
    index_1.get("/child_controller"),
    index_1.middleware(function (req, res, d) {
        req.working += "working4";
        d();
    })
], BaseController.prototype, "test", null);
BaseController = tslib_1.__decorate([
    index_1.middleware(function (req, res, a) {
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
    index_1.middleware(function (req, res, e) {
        req.working += "working5";
        e();
    })
], ChildController.prototype, "test", null);
ChildController = tslib_1.__decorate([
    index_1.controller(),
    index_1.singleton(),
    index_1.middleware(function (req, res, b) {
        req.working += "working2";
        b();
    }),
    index_1.middleware(function (req, res, c) {
        req.working += "working3";
        c();
    })
], ChildController);
exports.ChildController = ChildController;
//# sourceMappingURL=abstractController.js.map