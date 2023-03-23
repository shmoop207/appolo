"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoratorParamsController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const manager_1 = require("../manager/manager");
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
    (0, route_1.get)("/test/decorator/param/:name/:name2"),
    (0, route_1.abstract)({ middleware: [userMiddleware_1.UserMiddleware] }),
    tslib_1.__param(4, (0, inject_1.inject)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DecoratorParamsController.prototype, "test", null);
DecoratorParamsController = tslib_1.__decorate([
    (0, route_1.controller)(),
    (0, inject_1.singleton)(),
    (0, inject_1.lazy)(),
    tslib_1.__param(0, (0, inject_1.inject)()),
    tslib_1.__metadata("design:paramtypes", [manager_1.Manager])
], DecoratorParamsController);
exports.DecoratorParamsController = DecoratorParamsController;
//# sourceMappingURL=decoratorParamsController.js.map