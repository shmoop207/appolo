"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
let ModuleController = class ModuleController extends route_1.Controller {
    test(req, res) {
        res.json({
            working: true,
            controllerName: this.route.controller,
            logger: this.logger2.getName() + this.logger3.getName()
        });
    }
};
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", Object)
], ModuleController.prototype, "logger2", void 0);
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", Object)
], ModuleController.prototype, "logger3", void 0);
tslib_1.__decorate([
    route_1.get("/test/module/"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ModuleController.prototype, "test", null);
ModuleController = tslib_1.__decorate([
    route_1.controller()
], ModuleController);
exports.ModuleController = ModuleController;
//# sourceMappingURL=moduleController.js.map