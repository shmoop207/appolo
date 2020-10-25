"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
let ValidationController = class ValidationController extends route_1.Controller {
    test(req, res) {
        res.json({ working: true, controllerName: this.route.controller, model: req.query });
    }
    validaion(req, res) {
        res.json(req.query);
    }
};
tslib_1.__decorate([
    route_1.get("/test/validations/"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ValidationController.prototype, "test", null);
tslib_1.__decorate([
    route_1.get("/test/validations/auth"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ValidationController.prototype, "validaion", null);
ValidationController = tslib_1.__decorate([
    route_1.controller()
], ValidationController);
exports.ValidationController = ValidationController;
//# sourceMappingURL=validationController.js.map