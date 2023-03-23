"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GzipController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const compression = require("compression");
const utils_1 = require("@appolo/utils");
const inject_1 = require("@appolo/inject");
let someHeader = (0, route_1.customRouteDecorator)((req, res, route) => {
    res.setHeader("x-test2", "222");
});
let GzipController = class GzipController extends route_1.Controller {
    async gzipAsync(req, res) {
        await utils_1.Promises.delay(10);
        res.gzip().json({ working: "dsadasnfkjdffdsfjdsvcvmclkxvmlkcxvlkmxclkmvlkcxmvlkcxmlvkmcxlmvlxcmvlkcxmlvmclxkvfsdlfjsdlkjflksdjkfljdslkjfljdslfjldksjflkjdslfjsdlkjflkdjsflkjdsljfldsjflkjdsdslfjlsdjfljdslfjldksjlkfjdslkjflkdsjlkfjsdlkjfsdljflksdjflsdjlkfdsjfsdjfkldhskjfhsdkjhfkjhadskfhadkshlfkdashfklhaklfhldsahflkdahkhdkfdakshfkjdfksjkshfdhsfdgnfdkjgjfdbgjhbdjhbgjhfdbgbdfjhbgbdfbgjdsbgjbdjkhfgbkdfgkfiuthrehilhvbcdbvdsbjhbdsjfbjdsbfbdsbfhjdbfjhbdjsbfjdbfbdsafbjhdbsfjhgndfkgjlkdjgljdlsfjldksjflkdjsflkjdslkjfdjslfjdlksjfldsjlkfjdslkjflkdsjfljdslfjdsiroeiwrioewrejwcnvcnxvkjnckxjbkdbgkdskfdskfkdsfdsnfjdnsfldskfnkdsajfdksjnfjdksnfkjdsahfkjdhsfkdhsfkjhdksfhkjdsadbvcxmnvbdsbjhbdsjhfbdsbfhdfihiuhriehriuhewiuhshkbfkdshfkdksfhdsiuhfudshfdhskfhdkshfkdshfkhdsiufhdisuhfksgkdfhgkhdjkgdjhsgfjhsdjkfgsjkgfjhgdsakfgdjshgfjkdsgjfgsdjhgfdgjfgfdsfdsfdsfdsfdsfdsfjdsljkjdshgkjdskghksdjhgkjsdhkljghsdkljhkdhskfhsdkhfkjsdkjfdskjhfkjdshfkdshkjfhdksjhfkjdhsfkjafkshksdkfsdsdjhgfhjdsghjfgdshfjdhsjkfhkdsjhfkdhskfhkdshfjgdshhjfgdjshfvdsbcn" });
    }
    gzip(req, res) {
        res.gzip({ min: 2 }).json({ working: true });
    }
    gzipDecorator(req, res) {
        res.json({ working: "dsadasnfkjdffdsfjdsvcvmclkxvmlkcxvlkmxclkmvlkcxmvlkcxmlvkmcxlmvlxcmvlkcxmlvmclxkvfsdlfjsdlkjflksdjkfljdslkjfljdslfjldksjflkjdslfjsdlkjflkdjsflkjdsljfldsjflkjdsdslfjlsdjfljdslfjldksjlkfjdslkjflkdsjlkfjsdlkjfsdljflksdjflsdjlkfdsjfsdjfkldhskjfhsdkjhfkjhadskfhadkshlfkdashfklhaklfhldsahflkdahkhdkfdakshfkjdfksjkshfdhsfdgnfdkjgjfdbgjhbdjhbgjhfdbgbdfjhbgbdfbgjdsbgjbdjkhfgbkdfgkfiuthrehilhvbcdbvdsbjhbdsjfbjdsbfbdsbfhjdbfjhbdjsbfjdbfbdsafbjhdbsfjhgndfkgjlkdjgljdlsfjldksjflkdjsflkjdslkjfdjslfjdlksjfldsjlkfjdslkjflkdsjfljdslfjdsiroeiwrioewrejwcnvcnxvkjnckxjbkdbgkdskfdskfkdsfdsnfjdnsfldskfnkdsajfdksjnfjdksnfkjdsahfkjdhsfkdhsfkjhdksfhkjdsadbvcxmnvbdsbjhbdsjhfbdsbfhdfihiuhriehriuhewiuhshkbfkdshfkdksfhdsiuhfudshfdhskfhdkshfkdshfkhdsiufhdisuhfksgkdfhgkhdjkgdjhsgfjhsdjkfgsjkgfjhgdsakfgdjshgfjkdsgjfgsdjhgfdgjfgfdsfdsfdsfdsfdsfdsfjdsljkjdshgkjdskghksdjhgkjsdhkljghsdkljhkdhskfhsdkhfkjsdkjfdskjhfkjdshfkdshkjfhdksjhfkjdhsfkjafkshksdkfsdsdjhgfhjdsghjfgdshfjdhsjkfhkdsjhfkdhskfhkdshfjgdshhjfgdjshfvdsbcn" });
    }
    compression(req, res) {
        res.json({ working: "dsadasnfkjdshfdhsfdgnfdkjgjfdbgjhbdjhbgjhfdbgbdfjhbgbdfbgjdsbgjbdjkhfgbkdfgkfiuthrehilhvbcdbvdsbjhbdsjfbjdsbfbdsbfhjdbfjhbdjsbfjdbfbdsafbjhdbsfjhgndfkgjlkdjgljdlsfjldksjflkdjsflkjdslkjfdjslfjdlksjfldsjlkfjdslkjflkdsjfljdslfjdsiroeiwrioewrejwcnvcnxvkjnckxjbkdbgkdskfdskfkdsfdsnfjdnsfldskfnkdsajfdksjnfjdksnfkjdsahfkjdhsfkdhsfkjhdksfhkjdsadbvcxmnvbdsbjhbdsjhfbdsbfhdfihiuhriehriuhewiuhshkbfkdshfkdksfhdsiuhfudshfdhskfhdkshfkdshfkhdsiufhdisuhfksgkdfhgkhdjkgdjhsgfjhsdjkfgsjkgfjhgdsakfgdjshgfjkdsgjfgsdjhgfdgjfgsdjhgfhjdsghjfgdshfjdhsjkfhkdsjhfkdhskfhkdshfjgdshhjfgdjshfvdsbcn sdmnvchjdsvfhsahjbfjhsdfbdsjbfjhdsb" });
    }
};
tslib_1.__decorate([
    (0, inject_1.inject)(),
    tslib_1.__metadata("design:type", Object)
], GzipController.prototype, "manager", void 0);
tslib_1.__decorate([
    (0, route_1.get)('/test/gzip_async'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GzipController.prototype, "gzipAsync", null);
tslib_1.__decorate([
    (0, route_1.get)('/test/gzip'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], GzipController.prototype, "gzip", null);
tslib_1.__decorate([
    (0, route_1.get)('/test/gzip/decorator'),
    (0, route_1.gzip)(),
    (0, route_1.header)("x-test", "true"),
    someHeader,
    (0, route_1.statusCode)(201),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], GzipController.prototype, "gzipDecorator", null);
tslib_1.__decorate([
    (0, route_1.get)('/test/compression'),
    (0, route_1.middleware)(compression({ threshold: 512 })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], GzipController.prototype, "compression", null);
GzipController = tslib_1.__decorate([
    (0, route_1.controller)()
], GzipController);
exports.GzipController = GzipController;
//# sourceMappingURL=gzipController.js.map