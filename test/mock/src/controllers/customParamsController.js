"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomParamsController = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let someHeader = index_1.customRouteDecorator((req, res, route) => {
    res.setHeader("x-test2", "222");
});
let CustomParamsController = class CustomParamsController extends index_1.Controller {
    test(test, userAgent) {
        return { working: test, userAgent };
    }
};
tslib_1.__decorate([
    index_1.inject()
], CustomParamsController.prototype, "manager", void 0);
tslib_1.__decorate([
    index_1.post('/test/custom/params'),
    tslib_1.__param(0, index_1.body("test")), tslib_1.__param(1, index_1.headers("user-agent"))
], CustomParamsController.prototype, "test", null);
CustomParamsController = tslib_1.__decorate([
    index_1.controller()
], CustomParamsController);
exports.CustomParamsController = CustomParamsController;
//# sourceMappingURL=customParamsController.js.map