"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
const compression = require("compression");
const Q = require("bluebird");
let GzipController = class GzipController extends index_1.Controller {
    async gzipAsync(req, res) {
        await Q.delay(10);
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
    index_1.headers("x-test", "true"),
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