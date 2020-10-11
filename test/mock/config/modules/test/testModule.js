"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestModule = void 0;
const tslib_1 = require("tslib");
const engine_1 = require("@appolo/engine");
const index_1 = require("@appolo/inject/index");
let TestModule = class TestModule extends engine_1.Module {
    constructor() {
        super(...arguments);
        this.order = [];
    }
    beforeAppInitialize() {
        this.order.push("beforeAppInitialize");
    }
    beforeModuleInitialize() {
        this.order.push("beforeModuleInitialize");
    }
    beforeModuleLaunch() {
        this.order.push("beforeModuleLaunch");
    }
    onInjectInitialize() {
        this.order.push("onInjectInitialize");
    }
    onInjectBootstrap() {
        this.order.push("onInjectBootstrap");
    }
    afterModuleInitialize() {
        this.order.push("afterModuleInitialize");
    }
    afterAppInitialize() {
        this.order.push("afterAppInitialize");
    }
    afterModuleLaunch() {
        this.order.push("afterModuleLaunch");
    }
    afterAppLaunch() {
        this.order.push("afterAppLaunch");
    }
    beforeReset() {
        this.order.push("beforeReset");
    }
    reset() {
        this.order.push("reset");
    }
};
tslib_1.__decorate([
    index_1.initAsync()
], TestModule.prototype, "onInjectInitialize", null);
tslib_1.__decorate([
    index_1.bootstrapAsync()
], TestModule.prototype, "onInjectBootstrap", null);
TestModule = tslib_1.__decorate([
    engine_1.module()
], TestModule);
exports.TestModule = TestModule;
//# sourceMappingURL=testModule.js.map