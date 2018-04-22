"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
const monitorController_1 = require("./src/monitorController");
let MonitorModule = class MonitorModule extends index_1.Module {
};
MonitorModule = tslib_1.__decorate([
    index_1.module({
        exports: [monitorController_1.MonitorController]
    })
], MonitorModule);
exports.MonitorModule = MonitorModule;
//# sourceMappingURL=monitorModule.js.map