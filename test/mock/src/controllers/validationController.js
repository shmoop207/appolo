"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let ValidationController = class ValidationController extends index_1.Controller {
    test(req, res) {
        res.json({ working: true, controllerName: this.route.controller, model: req.model });
    }
    validaion(req, res) {
        res.json(req.model);
    }
};
tslib_1.__decorate([
    index_1.pathGet("/test/validations/"),
    index_1.validation("userName", index_1.validator.string().required())
], ValidationController.prototype, "test", null);
tslib_1.__decorate([
    index_1.pathGet("/test/validations/auth"),
    index_1.validation({
        username: index_1.validator.string().alphanum().min(3).max(30).required(),
        password: index_1.validator.string().alphanum().min(3).max(30).required()
    })
], ValidationController.prototype, "validaion", null);
ValidationController = tslib_1.__decorate([
    index_1.define()
], ValidationController);
exports.ValidationController = ValidationController;
//# sourceMappingURL=validationController.js.map