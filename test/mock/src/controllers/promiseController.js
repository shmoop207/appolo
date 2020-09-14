"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
let PromiseController = class PromiseController extends route_1.Controller {
    async test(req, res) {
        return { working: "working" };
    }
    async testError(req, res) {
        throw new Error("not working");
    }
    testErrorNoPromise(req, res) {
        throw new route_1.BadRequestError("not working", { a: 1 }, 123);
    }
};
tslib_1.__decorate([
    inject_1.inject()
], PromiseController.prototype, "manager", void 0);
tslib_1.__decorate([
    route_1.get("test/promise")
], PromiseController.prototype, "test", null);
tslib_1.__decorate([
    route_1.get("test/promise/error")
], PromiseController.prototype, "testError", null);
tslib_1.__decorate([
    route_1.get("test/promise/no_error")
], PromiseController.prototype, "testErrorNoPromise", null);
PromiseController = tslib_1.__decorate([
    route_1.controller()
], PromiseController);
exports.PromiseController = PromiseController;
//# sourceMappingURL=promiseController.js.map