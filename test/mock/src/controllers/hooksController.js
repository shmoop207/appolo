"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let HooksController = class HooksController extends index_1.Controller {
    hooks(req, res) {
        return { query: req.model };
    }
};
tslib_1.__decorate([
    index_1.inject()
], HooksController.prototype, "manager", void 0);
tslib_1.__decorate([
    index_1.get("/test/hooks")
], HooksController.prototype, "hooks", null);
HooksController = tslib_1.__decorate([
    index_1.controller()
], HooksController);
exports.HooksController = HooksController;
//# sourceMappingURL=hooksController.js.map