"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bootstrap = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../index");
const appolo_utils_1 = require("appolo-utils");
let Bootstrap = class Bootstrap {
    async run() {
        this.working = true;
        await appolo_utils_1.Promises.delay(10);
    }
};
tslib_1.__decorate([
    index_1.inject()
], Bootstrap.prototype, "manager", void 0);
Bootstrap = tslib_1.__decorate([
    index_1.define(),
    index_1.bootstrap(),
    index_1.singleton(),
    index_1.override()
], Bootstrap);
exports.Bootstrap = Bootstrap;
//# sourceMappingURL=bootstrap.js.map