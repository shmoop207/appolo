"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoratorParamsController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const userMiddleware_1 = require("../middleware/userMiddleware");
const inject_1 = require("@appolo/inject");
let DecoratorParamsController = class DecoratorParamsController extends route_1.StaticController {
    constructor(manager) {
        super();
        this.name = manager.name;
    }
    //@inject() manager: any;
    test(req, res, route, aaa, env) {
        this.sendOk(res, { model: env.test, name: this.name, user: req.user });
    }
};
tslib_1.__decorate([
    route_1.get("/test/decorator/param/:name/:name2"),
    route_1.abstract({ middleware: [userMiddleware_1.UserMiddleware] }),
    tslib_1.__param(4, inject_1.injectParam())
], DecoratorParamsController.prototype, "test", null);
DecoratorParamsController = tslib_1.__decorate([
    route_1.controller(),
    inject_1.singleton(),
    inject_1.lazy(),
    tslib_1.__param(0, inject_1.injectParam())
], DecoratorParamsController);
exports.DecoratorParamsController = DecoratorParamsController;
//# sourceMappingURL=decoratorParamsController.js.map