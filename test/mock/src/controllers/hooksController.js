"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
const types_1 = require("appolo-agent/lib/types");
let HooksController = class HooksController extends index_1.Controller {
    hooks(req, res) {
        return { query: req.model };
    }
};
tslib_1.__decorate([
    index_1.inject()
], HooksController.prototype, "manager", void 0);
tslib_1.__decorate([
    index_1.get("/test/hooks"),
    index_1.hook(types_1.Hooks.PreMiddleware, function (req, res, next) {
        req.model = Object.assign(Object.assign({}, req.model), { a: 11 });
        next();
    })
], HooksController.prototype, "hooks", null);
HooksController = tslib_1.__decorate([
    index_1.controller()
], HooksController);
exports.HooksController = HooksController;
//# sourceMappingURL=hooksController.js.map