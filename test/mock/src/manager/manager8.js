"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager8 = void 0;
const tslib_1 = require("tslib");
const manager7_1 = require("./manager7");
const manager6_1 = require("./manager6");
const inject_1 = require("@appolo/inject");
let Manager8 = class Manager8 extends manager7_1.Manager7 {
    get name() {
        return this.constructor.name;
    }
};
tslib_1.__decorate([
    (0, inject_1.inject)(),
    tslib_1.__metadata("design:type", manager6_1.Manager6)
], Manager8.prototype, "manager6", void 0);
Manager8 = tslib_1.__decorate([
    (0, inject_1.define)(),
    (0, inject_1.singleton)()
], Manager8);
exports.Manager8 = Manager8;
//# sourceMappingURL=manager8.js.map