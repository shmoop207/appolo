"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseController = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let PromiseController = class PromiseController extends index_1.Controller {
    async test(req, res) {
        return { working: "working" };
    }
    async testError(req, res) {
        throw new Error("not working");
    }
    testErrorNoPromise(req, res) {
        throw new index_1.BadRequestError("not working", { a: 1 }, 123);
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
tslib_1.__decorate([
    index_1.get("test/promise/no_error")
], PromiseController.prototype, "testErrorNoPromise", null);
PromiseController = tslib_1.__decorate([
    index_1.controller()
], PromiseController);
exports.PromiseController = PromiseController;
//# sourceMappingURL=promiseController.js.map