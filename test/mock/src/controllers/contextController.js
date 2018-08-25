"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
const userMiddleware_1 = require("../middleware/userMiddleware");
let ContextController = class ContextController extends index_1.Controller {
    async test(req, res) {
        let userName = await this.manager.getContextName();
        res.json({ userName });
    }
};
tslib_1.__decorate([
    index_1.inject()
], ContextController.prototype, "manager", void 0);
tslib_1.__decorate([
    index_1.get("/test/context/"),
    index_1.validation("userName", index_1.validator.string().required()),
    index_1.middleware(userMiddleware_1.UserMiddleware)
], ContextController.prototype, "test", null);
ContextController = tslib_1.__decorate([
    index_1.controller()
], ContextController);
exports.ContextController = ContextController;
//# sourceMappingURL=contextController.js.map