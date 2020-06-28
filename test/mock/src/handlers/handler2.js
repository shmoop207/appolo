"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler2 = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let Handler2 = class Handler2 {
    handle() {
        return 2;
    }
};
Handler2 = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton(),
    index_1.alias("IHandler")
], Handler2);
exports.Handler2 = Handler2;
//# sourceMappingURL=handler2.js.map