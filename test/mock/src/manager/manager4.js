"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager4 = void 0;
const tslib_1 = require("tslib");
const baseManager_1 = require("./baseManager");
const inject_1 = require("@appolo/inject");
let Manager4 = class Manager4 extends baseManager_1.BaseManager {
    get name() {
        return this.constructor.name;
    }
};
tslib_1.__decorate([
    inject_1.inject()
], Manager4.prototype, "manager3", void 0);
Manager4 = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], Manager4);
exports.Manager4 = Manager4;
//# sourceMappingURL=manager4.js.map