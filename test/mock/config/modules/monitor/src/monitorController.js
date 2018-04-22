"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../../../index");
let MonitorController = class MonitorController extends index_1.Controller {
    monitor() {
        return { ok: true, type: this.env.type };
    }
};
tslib_1.__decorate([
    index_1.inject()
], MonitorController.prototype, "env", void 0);
tslib_1.__decorate([
    index_1.get()
], MonitorController.prototype, "monitor", null);
MonitorController = tslib_1.__decorate([
    index_1.controller("test/monitor")
], MonitorController);
exports.MonitorController = MonitorController;
//# sourceMappingURL=monitorController.js.map