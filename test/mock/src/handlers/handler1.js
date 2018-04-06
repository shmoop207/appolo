"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let Handler1 = class Handler1 {
    handle() {
        return 1;
    }
};
Handler1 = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton(),
    index_1.alias("IHandler")
], Handler1);
exports.Handler1 = Handler1;
//# sourceMappingURL=handler1.js.map