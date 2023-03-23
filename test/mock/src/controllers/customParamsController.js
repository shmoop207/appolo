"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomParamsController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
let someHeader = (0, route_1.customRouteDecorator)((req, res, route) => {
    res.setHeader("x-test2", "222");
});
let CustomParamsController = class CustomParamsController extends route_1.Controller {
    test(id, test, req, contentType) {
        return { working: test, contentType, id };
    }
};
tslib_1.__decorate([
    (0, inject_1.inject)(),
    tslib_1.__metadata("design:type", Object)
], CustomParamsController.prototype, "manager", void 0);
tslib_1.__decorate([
    (0, route_1.post)('/test/custom/params/:id'),
    tslib_1.__param(0, (0, route_1.param)()),
    tslib_1.__param(1, (0, route_1.body)("test")),
    tslib_1.__param(3, (0, route_1.headers)("content-type")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], CustomParamsController.prototype, "test", null);
CustomParamsController = tslib_1.__decorate([
    (0, route_1.controller)()
], CustomParamsController);
exports.CustomParamsController = CustomParamsController;
//# sourceMappingURL=customParamsController.js.map