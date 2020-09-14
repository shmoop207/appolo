"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationController2 = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const validationController_1 = require("./validationController");
let ValidationController2 = class ValidationController2 extends validationController_1.ValidationController {
    test2(req, res) {
        return super.test(req, res);
    }
};
tslib_1.__decorate([
    route_1.get("/test/nested/")
], ValidationController2.prototype, "test2", null);
ValidationController2 = tslib_1.__decorate([
    route_1.controller()
], ValidationController2);
exports.ValidationController2 = ValidationController2;
//# sourceMappingURL=validationController2.js.map