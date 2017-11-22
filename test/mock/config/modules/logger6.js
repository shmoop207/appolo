"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Q = require("bluebird");
function default_1(options) {
    return (env, inject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        let logger6 = {
            getName: function () {
                return env.test + "logger6";
            }
        };
        inject.addObject('logger6', logger6);
        yield Q.delay(2);
    });
}
exports.default = default_1;
//# sourceMappingURL=logger6.js.map