"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let IndexController = class IndexController extends index_1.StaticController {
    hello(req, res) {
        res.send('hello world');
    }
};
tslib_1.__decorate([
    index_1.get("/test/")
], IndexController.prototype, "hello", null);
IndexController = tslib_1.__decorate([
    index_1.controller(),
    index_1.singleton()
], IndexController);
exports.IndexController = IndexController;
//# sourceMappingURL=indexController.js.map