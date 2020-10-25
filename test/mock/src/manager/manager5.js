"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager5 = void 0;
const tslib_1 = require("tslib");
const manager3_1 = require("./manager3");
const utils_1 = require("@appolo/utils");
const inject_1 = require("@appolo/inject");
let Manager5 = class Manager5 {
    get name() {
        return this.constructor.name + utils_1.Arrays.sumBy(this.handlers, h => h.handle()).toString();
    }
};
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", manager3_1.Manager3)
], Manager5.prototype, "manager3", void 0);
tslib_1.__decorate([
    inject_1.alias("IHandler"),
    tslib_1.__metadata("design:type", Array)
], Manager5.prototype, "handlers", void 0);
Manager5 = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton(),
    inject_1.lazy()
], Manager5);
exports.Manager5 = Manager5;
//# sourceMappingURL=manager5.js.map