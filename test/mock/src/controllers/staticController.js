"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticController2 = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let StaticController2 = class StaticController2 extends index_1.StaticController {
    test(req, res) {
        res.json({ model: this.getModel(req) });
    }
    test2(req, res) {
        res.json({ model: this.getModel(req) });
    }
};
tslib_1.__decorate([
    index_1.inject()
], StaticController2.prototype, "manager", void 0);
tslib_1.__decorate([
    index_1.post("/test/static/controller/:name/:bbb/post")
], StaticController2.prototype, "test", null);
tslib_1.__decorate([
    index_1.get("/test/static/controller/:name/:name2")
], StaticController2.prototype, "test2", null);
StaticController2 = tslib_1.__decorate([
    index_1.controller(),
    index_1.singleton(),
    index_1.lazy()
], StaticController2);
exports.StaticController2 = StaticController2;
//# sourceMappingURL=staticController.js.map