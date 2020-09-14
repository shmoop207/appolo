"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestMiddleware = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
let TestMiddleware = class TestMiddleware extends route_1.Middleware {
    run(req, res, next) {
        res.send({ working: true, middleware: true, name: this.manager.name });
    }
};
tslib_1.__decorate([
    inject_1.inject()
], TestMiddleware.prototype, "manager", void 0);
TestMiddleware = tslib_1.__decorate([
    inject_1.define()
], TestMiddleware);
exports.TestMiddleware = TestMiddleware;
//# sourceMappingURL=middleware.js.map