"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let Manager = class Manager {
    get name() {
        return this.constructor.name;
    }
};
tslib_1.__decorate([
    index_1.inject()
], Manager.prototype, "manager2", void 0);
tslib_1.__decorate([
    index_1.inject()
], Manager.prototype, "manager3", void 0);
Manager = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton()
], Manager);
exports.Manager = Manager;
//# sourceMappingURL=manager.js.map