"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
const appolo_agent_1 = require("appolo-agent");
let AuthMiddleware = class AuthMiddleware extends index_1.StaticMiddleware {
    run(req, res, next) {
        this.sendUnauthorized(next, new appolo_agent_1.HttpError(403, "NOT AUTHORIZED"), 201);
    }
};
tslib_1.__decorate([
    index_1.inject()
], AuthMiddleware.prototype, "manager", void 0);
AuthMiddleware = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton(),
    index_1.lazy()
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=authMiddleware.js.map