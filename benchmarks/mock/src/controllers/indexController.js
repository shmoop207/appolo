"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
let IndexController = class IndexController extends route_1.StaticController {
    hello(req, res) {
        res.send('hello world');
    }
};
tslib_1.__decorate([
    route_1.get("/test/")
], IndexController.prototype, "hello", null);
IndexController = tslib_1.__decorate([
    route_1.controller(),
    inject_1.singleton()
], IndexController);
exports.IndexController = IndexController;
//# sourceMappingURL=indexController.js.map