"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let UserMiddleware = class UserMiddleware extends index_1.Middleware {
    run(req, res, next) {
        req.user = "user";
        this.context.set("user", req.query.userName);
        next();
    }
};
tslib_1.__decorate([
    index_1.inject()
], UserMiddleware.prototype, "context", void 0);
UserMiddleware = tslib_1.__decorate([
    index_1.define()
], UserMiddleware);
exports.UserMiddleware = UserMiddleware;
//# sourceMappingURL=userMiddleware.js.map