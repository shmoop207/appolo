"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorController = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
const errorMiddleware_1 = require("../middleware/errorMiddleware");
let ErrorController = class ErrorController extends index_1.Controller {
    async error(req, res) {
        throw new index_1.HttpError(500, "error");
    }
    async error2(req, res) {
        throw new index_1.HttpError(500, "error");
    }
};
tslib_1.__decorate([
    index_1.inject()
], ErrorController.prototype, "manager", void 0);
tslib_1.__decorate([
    index_1.get('/test/error'),
    index_1.error(function (err, req, res, next) {
        err.message = err.message + "aaaa";
        next(err);
    }),
    index_1.error(errorMiddleware_1.ErrorMiddleware)
], ErrorController.prototype, "error", null);
tslib_1.__decorate([
    index_1.get('/test/error2'),
    index_1.error(function (err, req, res, next) {
        err.message = err.message + "aaaa";
        next(err);
    })
], ErrorController.prototype, "error2", null);
ErrorController = tslib_1.__decorate([
    index_1.controller()
], ErrorController);
exports.ErrorController = ErrorController;
//# sourceMappingURL=errorController.js.map