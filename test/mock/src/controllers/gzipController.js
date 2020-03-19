"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
const compression = require("compression");
const appolo_utils_1 = require("appolo-utils");
let someHeader = index_1.customRouteDecorator((req, res, route) => {
    res.setHeader("x-test2", "222");
});
let GzipController = class GzipController extends index_1.Controller {
    async gzipAsync(req, res) {
        await appolo_utils_1.Promises.delay(10);
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
    index_1.inject()
], GzipController.prototype, "manager", void 0);
tslib_1.__decorate([
    index_1.get('/test/gzip_async')
], GzipController.prototype, "gzipAsync", null);
tslib_1.__decorate([
    index_1.get('/test/gzip')
], GzipController.prototype, "gzip", null);
tslib_1.__decorate([
    index_1.get('/test/gzip/decorator'),
    index_1.gzip(),
    index_1.header("x-test", "true"),
    someHeader,
    index_1.statusCode(201)
], GzipController.prototype, "gzipDecorator", null);
tslib_1.__decorate([
    index_1.get('/test/compression'),
    index_1.middleware(compression({ threshold: 512 }))
], GzipController.prototype, "compression", null);
GzipController = tslib_1.__decorate([
    index_1.controller()
], GzipController);
exports.GzipController = GzipController;
//# sourceMappingURL=gzipController.js.map