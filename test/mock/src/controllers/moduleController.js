"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let ModuleController = class ModuleController extends index_1.Controller {
    test(req, res) {
        res.json({
            working: true,
            controllerName: this.route.controller,
            logger: this.logger2.getName() + this.logger3.getName()
        });
    }
};
tslib_1.__decorate([
    index_1.inject()
], ModuleController.prototype, "logger2", void 0);
tslib_1.__decorate([
    index_1.inject()
], ModuleController.prototype, "logger3", void 0);
tslib_1.__decorate([
    index_1.pathGet("/test/module/")
], ModuleController.prototype, "test", null);
ModuleController = tslib_1.__decorate([
    index_1.controller()
], ModuleController);
exports.ModuleController = ModuleController;
//# sourceMappingURL=moduleController.js.map