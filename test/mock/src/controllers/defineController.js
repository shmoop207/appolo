"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefineController = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let DefineController = class DefineController extends index_1.Controller {
    test(req, res) {
        res.json({ working: true, controllerName: this.route.controller, model: req.query, manager5: this.manager5.name });
    }
};
tslib_1.__decorate([
    index_1.inject()
], DefineController.prototype, "manager5", void 0);
DefineController = tslib_1.__decorate([
    index_1.controller()
], DefineController);
exports.DefineController = DefineController;
//# sourceMappingURL=defineController.js.map