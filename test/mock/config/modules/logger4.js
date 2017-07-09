"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require("bluebird");
function default_1(options) {
    return (env, inject, logger2) => {
        let logger4 = {
            getName: function () {
                return logger2.getName() + "logger4";
            }
        };
        inject.addObject('logger4', logger4);
        return Q.delay(1);
    };
}
exports.default = default_1;
//# sourceMappingURL=logger4.js.map