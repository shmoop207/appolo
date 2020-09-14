"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager7 = void 0;
const tslib_1 = require("tslib");
const baseManager_1 = require("./baseManager");
const inject_1 = require("@appolo/inject");
let Manager7 = class Manager7 extends baseManager_1.BaseManager {
    constructor() {
        super(...arguments);
        this._initCount = 0;
    }
    initialize() {
        this._initCount++;
    }
    get name() {
        return this.constructor.name;
    }
    get initCout() {
        return this._initCount;
    }
};
tslib_1.__decorate([
    inject_1.inject()
], Manager7.prototype, "manager4", void 0);
tslib_1.__decorate([
    inject_1.initMethod()
], Manager7.prototype, "initialize", null);
Manager7 = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], Manager7);
exports.Manager7 = Manager7;
//# sourceMappingURL=manager7.js.map