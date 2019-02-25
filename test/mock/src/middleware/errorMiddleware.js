"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let ErrorMiddleware = class ErrorMiddleware extends index_1.Middleware {
    catch(err, req, res, next) {
        res.status(503);
        res.json({ data: err.message });
    }
};
ErrorMiddleware = tslib_1.__decorate([
    index_1.define()
], ErrorMiddleware);
exports.ErrorMiddleware = ErrorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map