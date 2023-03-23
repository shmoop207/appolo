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
    (0, inject_1.inject)(),
    tslib_1.__metadata("design:type", Object)
], PromiseController.prototype, "manager", void 0);
tslib_1.__decorate([
    (0, route_1.get)("test/promise"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PromiseController.prototype, "test", null);
tslib_1.__decorate([
    (0, route_1.get)("test/promise/error"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PromiseController.prototype, "testError", null);
tslib_1.__decorate([
    (0, route_1.get)("test/promise/no_error"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], PromiseController.prototype, "testErrorNoPromise", null);
PromiseController = tslib_1.__decorate([
    (0, route_1.controller)()
], PromiseController);
exports.PromiseController = PromiseController;
//# sourceMappingURL=promiseController.js.map