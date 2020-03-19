"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let ValidationController = class ValidationController extends index_1.Controller {
    test(req, res) {
        res.json({ working: true, controllerName: this.route.controller, model: req.model });
    }
    validaion(req, res) {
        res.json(req.query);
    }
};
tslib_1.__decorate([
    index_1.get("/test/validations/")
], ValidationController.prototype, "test", null);
tslib_1.__decorate([
    index_1.get("/test/validations/auth")
], ValidationController.prototype, "validaion", null);
ValidationController = tslib_1.__decorate([
    index_1.controller()
], ValidationController);
exports.ValidationController = ValidationController;
//# sourceMappingURL=validationController.js.map