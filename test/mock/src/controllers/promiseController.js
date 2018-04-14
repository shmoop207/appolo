"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let PromiseController = class PromiseController extends index_1.Controller {
    async test(req, res) {
        return { working: "working" };
    }
    async testError(req, res) {
        throw new Error("not working");
    }
};
tslib_1.__decorate([
    index_1.inject()
], PromiseController.prototype, "manager", void 0);
tslib_1.__decorate([
    index_1.get("test/promise")
], PromiseController.prototype, "test", null);
tslib_1.__decorate([
    index_1.get("test/promise/error")
], PromiseController.prototype, "testError", null);
PromiseController = tslib_1.__decorate([
    index_1.controller()
], PromiseController);
exports.PromiseController = PromiseController;
//# sourceMappingURL=promiseController.js.map