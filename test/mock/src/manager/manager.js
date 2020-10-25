"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const tslib_1 = require("tslib");
const manager3_1 = require("./manager3");
const manager2_1 = require("./manager2");
const inject_1 = require("@appolo/inject");
let Manager = class Manager {
    get name() {
        return this.constructor.name;
    }
};
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", manager2_1.Manager2)
], Manager.prototype, "manager2", void 0);
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", manager3_1.Manager3)
], Manager.prototype, "manager3", void 0);
Manager = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], Manager);
exports.Manager = Manager;
//# sourceMappingURL=manager.js.map