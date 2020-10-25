"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const errorMiddleware_1 = require("../middleware/errorMiddleware");
const inject_1 = require("@appolo/inject");
let ErrorController = class ErrorController extends route_1.Controller {
    async error(req, res) {
        throw new route_1.HttpError(500, "error");
    }
    async error2(req, res) {
        throw new route_1.HttpError(500, "error");
    }
    async error3(req, res) {
        throw new Error("some error");
    }
};
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", Object)
], ErrorController.prototype, "manager", void 0);
tslib_1.__decorate([
    route_1.get('/test/error'),
    route_1.error(function (err, req, res, next) {
        err.message = err.message + "aaaa";
        next(err);
    }),
    route_1.error(errorMiddleware_1.ErrorMiddleware),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ErrorController.prototype, "error", null);
tslib_1.__decorate([
    route_1.get('/test/error2'),
    route_1.error(function (err, req, res, next) {
        err.message = err.message + "aaaa";
        next(err);
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ErrorController.prototype, "error2", null);
tslib_1.__decorate([
    route_1.get('/test/error3'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ErrorController.prototype, "error3", null);
ErrorController = tslib_1.__decorate([
    route_1.controller()
], ErrorController);
exports.ErrorController = ErrorController;
//# sourceMappingURL=errorController.js.map