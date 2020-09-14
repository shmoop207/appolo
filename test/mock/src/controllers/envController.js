"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
let EnvController = class EnvController extends route_1.Controller {
    test(req, res) {
        res.json({ working: true, controllerName: this.route.controller });
    }
};
EnvController = tslib_1.__decorate([
    route_1.controller()
], EnvController);
exports.EnvController = EnvController;
//# sourceMappingURL=envController.js.map