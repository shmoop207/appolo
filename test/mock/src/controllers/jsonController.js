"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
let JsonController = class JsonController extends route_1.Controller {
    json(req, res) {
        res.gzip().json({ query: req.query });
    }
    jsonPost(req, res) {
        res.gzip().json({ body: req.body });
    }
};
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", Object)
], JsonController.prototype, "manager", void 0);
tslib_1.__decorate([
    route_1.get("/test/json"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], JsonController.prototype, "json", null);
tslib_1.__decorate([
    route_1.post("/test/json"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], JsonController.prototype, "jsonPost", null);
JsonController = tslib_1.__decorate([
    route_1.controller()
], JsonController);
exports.JsonController = JsonController;
//# sourceMappingURL=jsonController.js.map