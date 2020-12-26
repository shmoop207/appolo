"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMiddleware = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
let ContextMiddleware = class ContextMiddleware extends route_1.Middleware {
    static for(context) {
        return super.for(context);
    }
    run(context, req, next) {
        req.user = context;
        next();
    }
};
tslib_1.__decorate([
    tslib_1.__param(0, route_1.context()), tslib_1.__param(1, route_1.req()), tslib_1.__param(2, route_1.next()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ContextMiddleware.prototype, "run", null);
ContextMiddleware = tslib_1.__decorate([
    inject_1.define()
], ContextMiddleware);
exports.ContextMiddleware = ContextMiddleware;
//# sourceMappingURL=contextMiddleware.js.map