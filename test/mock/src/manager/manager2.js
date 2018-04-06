"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let Manager2 = class Manager2 {
    get name() {
        return this.constructor.name;
    }
};
Manager2 = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton()
], Manager2);
exports.Manager2 = Manager2;
//# sourceMappingURL=manager2.js.map