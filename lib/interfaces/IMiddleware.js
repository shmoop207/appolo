"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareType = exports.RequestContextSymbol = void 0;
exports.RequestContextSymbol = Symbol("requestContext");
var MiddlewareType;
(function (MiddlewareType) {
    MiddlewareType[MiddlewareType["MiddleWare"] = 0] = "MiddleWare";
    MiddlewareType[MiddlewareType["Error"] = 1] = "Error";
    MiddlewareType[MiddlewareType["Data"] = 2] = "Data";
})(MiddlewareType = exports.MiddlewareType || (exports.MiddlewareType = {}));
//# sourceMappingURL=IMiddleware.js.map