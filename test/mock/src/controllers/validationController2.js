"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
const validationController_1 = require("./validationController");
let ValidationController2 = class ValidationController2 extends validationController_1.ValidationController {
    test2(req, res) {
        return super.test(req, res);
    }
};
tslib_1.__decorate([
    index_1.get("/test/nested/")
], ValidationController2.prototype, "test2", null);
ValidationController2 = tslib_1.__decorate([
    index_1.controller()
], ValidationController2);
exports.ValidationController2 = ValidationController2;
//# sourceMappingURL=validationController2.js.map