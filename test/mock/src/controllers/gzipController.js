"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GzipController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const compression = require("compression");
const utils_1 = require("@appolo/utils");
const inject_1 = require("@appolo/inject");
let someHeader = route_1.customRouteDecorator((req, res, route) => {
    res.setHeader("x-test2", "222");
});
let GzipController = class GzipController extends route_1.Controller {
    async gzipAsync(req, res) {
        await utils_1.Promises.delay(10);
        res.gzip().json({ working: true });
    }
    gzip(req, res) {
        res.gzip().json({ working: true });
    }
    gzipDecorator(req, res) {
        res.json({ working: true });
    }
    compression(req, res) {
        res.json({ working: "dsadasnfkjdshfdhsfdgnfdkjgjfdbgjhbdjhbgjhfdbgbdfjhbgbdfbgjdsbgjbdjkhfgbkdfgkfiuthrehilhvbcdbvdsbjhbdsjfbjdsbfbdsbfhjdbfjhbdjsbfjdbfbdsafbjhdbsfjhgndfkgjlkdjgljdlsfjldksjflkdjsflkjdslkjfdjslfjdlksjfldsjlkfjdslkjflkdsjfljdslfjdsiroeiwrioewrejwcnvcnxvkjnckxjbkdbgkdskfdskfkdsfdsnfjdnsfldskfnkdsajfdksjnfjdksnfkjdsahfkjdhsfkdhsfkjhdksfhkjdsadbvcxmnvbdsbjhbdsjhfbdsbfhdfihiuhriehriuhewiuhshkbfkdshfkdksfhdsiuhfudshfdhskfhdkshfkdshfkhdsiufhdisuhfksgkdfhgkhdjkgdjhsgfjhsdjkfgsjkgfjhgdsakfgdjshgfjkdsgjfgsdjhgfdgjfgsdjhgfhjdsghjfgdshfjdhsjkfhkdsjhfkdhskfhkdshfjgdshhjfgdjshfvdsbcn sdmnvchjdsvfhsahjbfjhsdfbdsjbfjhdsb" });
    }
};
tslib_1.__decorate([
    inject_1.inject()
], GzipController.prototype, "manager", void 0);
tslib_1.__decorate([
    route_1.get('/test/gzip_async')
], GzipController.prototype, "gzipAsync", null);
tslib_1.__decorate([
    route_1.get('/test/gzip')
], GzipController.prototype, "gzip", null);
tslib_1.__decorate([
    route_1.get('/test/gzip/decorator'),
    route_1.gzip(),
    route_1.header("x-test", "true"),
    someHeader,
    route_1.statusCode(201)
], GzipController.prototype, "gzipDecorator", null);
tslib_1.__decorate([
    route_1.get('/test/compression'),
    route_1.middleware(compression({ threshold: 512 }))
], GzipController.prototype, "compression", null);
GzipController = tslib_1.__decorate([
    route_1.controller()
], GzipController);
exports.GzipController = GzipController;
//# sourceMappingURL=gzipController.js.map