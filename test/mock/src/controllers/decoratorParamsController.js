"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
const userMiddleware_1 = require("../middleware/userMiddleware");
let DecoratorParamsController = class DecoratorParamsController extends index_1.StaticController {
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
    index_1.get("/test/decorator/param/:name/:name2"),
    index_1.abstract({ middleware: [userMiddleware_1.UserMiddleware] }),
    tslib_1.__param(4, index_1.injectParam())
], DecoratorParamsController.prototype, "test", null);
DecoratorParamsController = tslib_1.__decorate([
    index_1.controller(),
    index_1.singleton(),
    index_1.lazy(),
    tslib_1.__param(0, index_1.injectParam())
], DecoratorParamsController);
exports.DecoratorParamsController = DecoratorParamsController;
//# sourceMappingURL=decoratorParamsController.js.map