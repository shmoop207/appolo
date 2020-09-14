"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
let ErrorMiddleware = class ErrorMiddleware extends route_1.Middleware {
    catch(err, req, res, next) {
        res.status(503);
        res.json({ data: err.message });
    }
};
ErrorMiddleware = tslib_1.__decorate([
    inject_1.define()
], ErrorMiddleware);
exports.ErrorMiddleware = ErrorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map