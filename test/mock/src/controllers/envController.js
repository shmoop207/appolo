"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let EnvController = class EnvController extends index_1.Controller {
    test(req, res) {
        res.json({ working: true, controllerName: this.route.controller });
    }
};
EnvController = tslib_1.__decorate([
    index_1.define()
], EnvController);
exports.EnvController = EnvController;
//# sourceMappingURL=envController.js.map