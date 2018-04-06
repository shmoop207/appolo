"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let TestMiddleware = class TestMiddleware extends index_1.Middleware {
    run(req, res, next) {
        res.send({ working: true, middleware: true, name: this.manager.name });
    }
};
tslib_1.__decorate([
    index_1.inject()
], TestMiddleware.prototype, "manager", void 0);
TestMiddleware = tslib_1.__decorate([
    index_1.define()
], TestMiddleware);
exports.TestMiddleware = TestMiddleware;
//# sourceMappingURL=middleware.js.map