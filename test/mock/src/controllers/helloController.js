"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
let HelloController = class HelloController extends route_1.Controller {
    hello(req, res) {
        res.json({ test: "hello", name: this.constructor.name });
    }
};
tslib_1.__decorate([
    (0, route_1.get)('/test/hello'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], HelloController.prototype, "hello", null);
HelloController = tslib_1.__decorate([
    (0, route_1.controller)()
], HelloController);
exports.HelloController = HelloController;
//# sourceMappingURL=helloController.js.map