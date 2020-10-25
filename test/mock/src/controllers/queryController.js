"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
let QueryController = class QueryController extends route_1.Controller {
    test(req, res) {
        res.json(req.query);
    }
    protocol(req, res) {
        res.json({ protocol: req.protocol, secure: req.secure, host: req.hostname });
    }
    cookie(req, res) {
        let date = new Date();
        date.setUTCFullYear(2100, 1, 1);
        date.setUTCHours(0, 0, 0, 0);
        res.cookie('cookie', 'hey', { expires: date });
        res.json(req.cookies);
    }
    cookieJson(req, res) {
        let date = new Date();
        date.setUTCFullYear(2100, 1, 1);
        date.setUTCHours(0, 0, 0, 0);
        res.cookie('cookie', { test: "working" }, { expires: date });
        res.json(req.cookies);
    }
    cookieClear(req, res) {
        let date = new Date();
        date.setUTCFullYear(2100, 1, 1);
        date.setUTCHours(0, 0, 0, 0);
        res.clearCookie('cookie');
        this.sendOk();
    }
};
tslib_1.__decorate([
    route_1.get("/test/query"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], QueryController.prototype, "test", null);
tslib_1.__decorate([
    route_1.get("/test/protocol"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], QueryController.prototype, "protocol", null);
tslib_1.__decorate([
    route_1.get("/test/cookie"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], QueryController.prototype, "cookie", null);
tslib_1.__decorate([
    route_1.get("/test/cookie_json"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], QueryController.prototype, "cookieJson", null);
tslib_1.__decorate([
    route_1.get("/test/cookie_clear"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], QueryController.prototype, "cookieClear", null);
QueryController = tslib_1.__decorate([
    route_1.controller()
], QueryController);
exports.QueryController = QueryController;
//# sourceMappingURL=queryController.js.map