"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let QueryController = class QueryController extends index_1.Controller {
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
    index_1.get("/test/query")
], QueryController.prototype, "test", null);
tslib_1.__decorate([
    index_1.get("/test/protocol")
], QueryController.prototype, "protocol", null);
tslib_1.__decorate([
    index_1.get("/test/cookie")
], QueryController.prototype, "cookie", null);
tslib_1.__decorate([
    index_1.get("/test/cookie_json")
], QueryController.prototype, "cookieJson", null);
tslib_1.__decorate([
    index_1.get("/test/cookie_clear")
], QueryController.prototype, "cookieClear", null);
QueryController = tslib_1.__decorate([
    index_1.controller()
], QueryController);
exports.QueryController = QueryController;
//# sourceMappingURL=queryController.js.map