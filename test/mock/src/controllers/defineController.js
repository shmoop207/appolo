"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefineController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const manager5_1 = require("../manager/manager5");
const inject_1 = require("@appolo/inject");
let DefineController = class DefineController extends route_1.Controller {
    test(req, res) {
        res.json({ working: true, controllerName: this.route.controller, model: req.query, manager5: this.manager5.name });
    }
};
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", manager5_1.Manager5)
], DefineController.prototype, "manager5", void 0);
DefineController = tslib_1.__decorate([
    route_1.controller()
], DefineController);
exports.DefineController = DefineController;
//# sourceMappingURL=defineController.js.map