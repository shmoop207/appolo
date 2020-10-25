"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HooksController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
let HooksController = class HooksController extends route_1.Controller {
    hooks(req, res) {
        return { query: req.model };
    }
};
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", Object)
], HooksController.prototype, "manager", void 0);
tslib_1.__decorate([
    route_1.get("/test/hooks"),
    route_1.hook(route_1.Hooks.PreMiddleware, function (req, res, next) {
        req.model = Object.assign(Object.assign({}, req.model), { a: 11 });
        next();
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], HooksController.prototype, "hooks", null);
HooksController = tslib_1.__decorate([
    route_1.controller()
], HooksController);
exports.HooksController = HooksController;
//# sourceMappingURL=hooksController.js.map