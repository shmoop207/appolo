"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager6 = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
const baseManager_1 = require("./baseManager");
let Manager6 = class Manager6 extends baseManager_1.BaseManager {
    initialize() {
    }
    get name() {
        return this.constructor.name;
    }
};
tslib_1.__decorate([
    index_1.inject()
], Manager6.prototype, "manager4", void 0);
tslib_1.__decorate([
    index_1.initMethod()
], Manager6.prototype, "initialize", null);
Manager6 = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton()
], Manager6);
exports.Manager6 = Manager6;
//# sourceMappingURL=manager6.js.map