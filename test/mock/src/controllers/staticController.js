"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    index_1.pathPost("/test/static/controller/:name/:bbb/post"),
    index_1.validation("test", index_1.validator.string()),
    index_1.validation("name", index_1.validator.string()),
    index_1.validation("userName", index_1.validator.string()),
    index_1.validation("name2", index_1.validator.string()),
    index_1.validation("name", index_1.validator.string()),
    index_1.validation("testPost", index_1.validator.boolean().required())
], StaticController2.prototype, "test", null);
tslib_1.__decorate([
    index_1.pathGet("/test/static/controller/:name/:name2"),
    index_1.validation("test", index_1.validator.string()),
    index_1.validation("name", index_1.validator.string()),
    index_1.validation("userName", index_1.validator.string()),
    index_1.validation("name2", index_1.validator.string()),
    index_1.validation("name", index_1.validator.string())
], StaticController2.prototype, "test2", null);
StaticController2 = tslib_1.__decorate([
    index_1.controller(),
    index_1.singleton(),
    index_1.lazy()
], StaticController2);
exports.StaticController2 = StaticController2;
//# sourceMappingURL=staticController.js.map