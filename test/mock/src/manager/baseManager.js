"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseManager = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
class BaseManager {
}
tslib_1.__decorate([
    (0, inject_1.inject)(),
    tslib_1.__metadata("design:type", Object)
], BaseManager.prototype, "logger", void 0);
tslib_1.__decorate([
    (0, inject_1.inject)(),
    tslib_1.__metadata("design:type", Object)
], BaseManager.prototype, "env", void 0);
exports.BaseManager = BaseManager;
//# sourceMappingURL=baseManager.js.map