"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager6 = void 0;
const tslib_1 = require("tslib");
const baseManager_1 = require("./baseManager");
const manager4_1 = require("./manager4");
const inject_1 = require("@appolo/inject");
let Manager6 = class Manager6 extends baseManager_1.BaseManager {
    initialize() {
    }
    get name() {
        return this.constructor.name;
    }
};
tslib_1.__decorate([
    (0, inject_1.inject)(),
    tslib_1.__metadata("design:type", manager4_1.Manager4)
], Manager6.prototype, "manager4", void 0);
tslib_1.__decorate([
    (0, inject_1.init)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Manager6.prototype, "initialize", null);
Manager6 = tslib_1.__decorate([
    (0, inject_1.define)(),
    (0, inject_1.singleton)()
], Manager6);
exports.Manager6 = Manager6;
//# sourceMappingURL=manager6.js.map