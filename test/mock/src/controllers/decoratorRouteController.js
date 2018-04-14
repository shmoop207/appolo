"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let DecoratorRouteController = class DecoratorRouteController extends index_1.StaticController {
    test(req, res) {
        res.json({ model: this.getModel(req) });
    }
    test2(req, res) {
        res.json({ model: this.getModel(req) });
    }
};
tslib_1.__decorate([
    index_1.inject()
], DecoratorRouteController.prototype, "manager", void 0);
tslib_1.__decorate([
    index_1.path("/test/decorator/route/:name/:name2"),
    index_1.validation("name2", index_1.validator.string()),
    index_1.validation("name", index_1.validator.string()),
    index_1.validation("test", index_1.validator.string())
], DecoratorRouteController.prototype, "test", null);
tslib_1.__decorate([
    index_1.path("/test/decorator2/route/:name/:name2"),
    index_1.validation("name2", index_1.validator.string()),
    index_1.validation("name", index_1.validator.string()),
    index_1.validation("test", index_1.validator.string())
], DecoratorRouteController.prototype, "test2", null);
DecoratorRouteController = tslib_1.__decorate([
    index_1.controller(),
    index_1.singleton(),
    index_1.lazy()
], DecoratorRouteController);
exports.DecoratorRouteController = DecoratorRouteController;
//# sourceMappingURL=decoratorRouteController.js.map