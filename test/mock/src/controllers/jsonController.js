"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonController = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let JsonController = class JsonController extends index_1.Controller {
    json(req, res) {
        res.gzip().json({ query: req.query });
    }
    jsonPost(req, res) {
        res.gzip().json({ body: req.body });
    }
};
tslib_1.__decorate([
    index_1.inject()
], JsonController.prototype, "manager", void 0);
tslib_1.__decorate([
    index_1.get("/test/json")
], JsonController.prototype, "json", null);
tslib_1.__decorate([
    index_1.post("/test/json")
], JsonController.prototype, "jsonPost", null);
JsonController = tslib_1.__decorate([
    index_1.controller()
], JsonController);
exports.JsonController = JsonController;
//# sourceMappingURL=jsonController.js.map