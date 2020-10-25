"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticController2 = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
let StaticController2 = class StaticController2 extends route_1.StaticController {
    test(req, res) {
        res.json({ model: this.getModel(req) });
    }
    test2(req, res) {
        res.json({ model: this.getModel(req) });
    }
};
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", Object)
], StaticController2.prototype, "manager", void 0);
tslib_1.__decorate([
    route_1.post("/test/static/controller/:name/:bbb/post"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], StaticController2.prototype, "test", null);
tslib_1.__decorate([
    route_1.get("/test/static/controller/:name/:name2"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], StaticController2.prototype, "test2", null);
StaticController2 = tslib_1.__decorate([
    route_1.controller(),
    inject_1.singleton(),
    inject_1.lazy()
], StaticController2);
exports.StaticController2 = StaticController2;
//# sourceMappingURL=staticController.js.map