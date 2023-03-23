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
    (0, inject_1.inject)(),
    tslib_1.__metadata("design:type", Object)
], MonitorController.prototype, "env", void 0);
tslib_1.__decorate([
    (0, route_1.get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], MonitorController.prototype, "monitor", null);
MonitorController = tslib_1.__decorate([
    (0, route_1.controller)("test/monitor")
], MonitorController);
exports.MonitorController = MonitorController;
//# sourceMappingURL=monitorController.js.map