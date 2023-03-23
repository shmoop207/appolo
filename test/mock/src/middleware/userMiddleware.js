"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMiddleware = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
let UserMiddleware = class UserMiddleware extends route_1.Middleware {
    run(req, res, next) {
        req.user = "user";
        next();
    }
};
UserMiddleware = tslib_1.__decorate([
    (0, inject_1.define)()
], UserMiddleware);
exports.UserMiddleware = UserMiddleware;
//# sourceMappingURL=userMiddleware.js.map