"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager8 = void 0;
const tslib_1 = require("tslib");
const manager7_1 = require("./manager7");
const inject_1 = require("@appolo/inject");
let Manager8 = class Manager8 extends manager7_1.Manager7 {
    get name() {
        return this.constructor.name;
    }
};
tslib_1.__decorate([
    inject_1.inject()
], Manager8.prototype, "manager6", void 0);
Manager8 = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], Manager8);
exports.Manager8 = Manager8;
//# sourceMappingURL=manager8.js.map