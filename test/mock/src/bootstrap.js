"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bootstrap = void 0;
const tslib_1 = require("tslib");
const manager_1 = require("./manager/manager");
const utils_1 = require("@appolo/utils");
const inject_1 = require("@appolo/inject");
const engine_1 = require("@appolo/engine");
let Bootstrap = class Bootstrap {
    async run() {
        this.working = true;
        await utils_1.Promises.delay(10);
    }
};
tslib_1.__decorate([
    (0, inject_1.inject)(),
    tslib_1.__metadata("design:type", manager_1.Manager)
], Bootstrap.prototype, "manager", void 0);
Bootstrap = tslib_1.__decorate([
    (0, inject_1.define)(),
    (0, engine_1.bootstrap)(),
    (0, inject_1.singleton)(),
    (0, inject_1.override)()
], Bootstrap);
exports.Bootstrap = Bootstrap;
//# sourceMappingURL=bootstrap.js.map