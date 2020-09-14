"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
let MonitorController = class MonitorController extends route_1.Controller {
    monitor() {
        return { ok: true, type: this.env.type };
    }
};
tslib_1.__decorate([
    inject_1.inject()
], MonitorController.prototype, "env", void 0);
tslib_1.__decorate([
    route_1.get()
], MonitorController.prototype, "monitor", null);
MonitorController = tslib_1.__decorate([
    route_1.controller("test/monitor")
], MonitorController);
exports.MonitorController = MonitorController;
//# sourceMappingURL=monitorController.js.map