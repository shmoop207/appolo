"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseManager = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
class BaseManager {
}
tslib_1.__decorate([
    index_1.inject()
], BaseManager.prototype, "logger", void 0);
tslib_1.__decorate([
    index_1.inject()
], BaseManager.prototype, "env", void 0);
exports.BaseManager = BaseManager;
//# sourceMappingURL=baseManager.js.map