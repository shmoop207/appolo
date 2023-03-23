"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorModule = void 0;
const tslib_1 = require("tslib");
const monitorController_1 = require("./src/monitorController");
const engine_1 = require("@appolo/engine");
let MonitorModule = class MonitorModule extends engine_1.Module {
};
MonitorModule = tslib_1.__decorate([
    (0, engine_1.module)({
        exports: [monitorController_1.MonitorController]
    })
], MonitorModule);
exports.MonitorModule = MonitorModule;
//# sourceMappingURL=monitorModule.js.map