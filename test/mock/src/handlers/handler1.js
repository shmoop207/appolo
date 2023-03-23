"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler1 = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
let Handler1 = class Handler1 {
    handle() {
        return 1;
    }
};
Handler1 = tslib_1.__decorate([
    (0, inject_1.define)(),
    (0, inject_1.singleton)(),
    (0, inject_1.alias)("IHandler")
], Handler1);
exports.Handler1 = Handler1;
//# sourceMappingURL=handler1.js.map