"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager3 = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
let Manager3 = class Manager3 {
    constructor() {
        this.TEST = 1;
    }
    get name() {
        return this.constructor.name;
    }
};
tslib_1.__decorate([
    inject_1.inject()
], Manager3.prototype, "manager2", void 0);
Manager3 = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], Manager3);
exports.Manager3 = Manager3;
//# sourceMappingURL=manager3.js.map