"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
let AuthMiddleware = class AuthMiddleware extends route_1.StaticMiddleware {
    run(req, res, next) {
        this.sendUnauthorized(next, new route_1.HttpError(403, "NOT AUTHORIZED"), 201);
    }
};
tslib_1.__decorate([
    inject_1.inject()
], AuthMiddleware.prototype, "manager", void 0);
AuthMiddleware = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton(),
    inject_1.lazy()
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=authMiddleware.js.map