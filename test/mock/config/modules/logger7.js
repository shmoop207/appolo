"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Q = require("bluebird");
function default_1(options) {
    return (env, inject, logger6) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        let logger7 = {
            getName: function () {
                return env.test + logger6.getName() + "logger7";
            }
        };
        inject.addObject('logger7', logger7);
        yield Q.delay(2);
    });
}
exports.default = default_1;
//# sourceMappingURL=logger7.js.map