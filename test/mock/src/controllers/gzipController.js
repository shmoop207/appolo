"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
const compression = require("compression");
let GzipController = class GzipController extends index_1.Controller {
    gzip(req, res) {
        res.gzip().json({ working: true });
    }
    compression(req, res) {
        res.json({ working: "dsadasnfkjdshfdhsfdgnfdkjgjfdbgjhbdjhbgjhfdbgbdfjhbgbdfbgjdsbgjbdjkhfgbkdfgkfiuthrehilhvbcdbvdsbjhbdsjfbjdsbfbdsbfhjdbfjhbdjsbfjdbfbdsafbjhdbsfjhgndfkgjlkdjgljdlsfjldksjflkdjsflkjdslkjfdjslfjdlksjfldsjlkfjdslkjflkdsjfljdslfjdsiroeiwrioewrejwcnvcnxvkjnckxjbkdbgkdskfdskfkdsfdsnfjdnsfldskfnkdsajfdksjnfjdksnfkjdsahfkjdhsfkdhsfkjhdksfhkjdsadbvcxmnvbdsbjhbdsjhfbdsbfhdfihiuhriehriuhewiuhshkbfkdshfkdksfhdsiuhfudshfdhskfhdkshfkdshfkhdsiufhdisuhfksgkdfhgkhdjkgdjhsgfjhsdjkfgsjkgfjhgdsakfgdjshgfjkdsgjfgsdjhgfdgjfgsdjhgfhjdsghjfgdshfjdhsjkfhkdsjhfkdhskfhkdshfjgdshhjfgdjshfvdsbcn sdmnvchjdsvfhsahjbfjhsdfbdsjbfjhdsb" });
    }
};
tslib_1.__decorate([
    index_1.inject()
], GzipController.prototype, "manager", void 0);
tslib_1.__decorate([
    index_1.pathGet('/test/gzip')
], GzipController.prototype, "gzip", null);
tslib_1.__decorate([
    index_1.pathGet('/test/compression'),
    index_1.middleware(compression({ threshold: 512 }))
], GzipController.prototype, "compression", null);
GzipController = tslib_1.__decorate([
    index_1.define()
], GzipController);
exports.GzipController = GzipController;
//# sourceMappingURL=gzipController.js.map