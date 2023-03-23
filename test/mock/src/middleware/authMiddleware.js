"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const manager_1 = require("../manager/manager");
const inject_1 = require("@appolo/inject");
let AuthMiddleware = class AuthMiddleware extends route_1.StaticMiddleware {
    run(next) {
        this.sendUnauthorized(next, new route_1.HttpError(403, "NOT AUTHORIZED"), 201);
    }
};
tslib_1.__decorate([
    (0, inject_1.inject)(),
    tslib_1.__metadata("design:type", manager_1.Manager)
], AuthMiddleware.prototype, "manager", void 0);
tslib_1.__decorate([
    tslib_1.__param(0, (0, route_1.next)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Function]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthMiddleware.prototype, "run", null);
AuthMiddleware = tslib_1.__decorate([
    (0, inject_1.define)(),
    (0, inject_1.singleton)(),
    (0, inject_1.lazy)()
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=authMiddleware.js.map