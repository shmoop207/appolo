"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMiddleware = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let UserMiddleware = class UserMiddleware extends index_1.Middleware {
    run(req, res, next) {
        req.user = "user";
        next();
    }
};
UserMiddleware = tslib_1.__decorate([
    index_1.define()
], UserMiddleware);
exports.UserMiddleware = UserMiddleware;
//# sourceMappingURL=userMiddleware.js.map