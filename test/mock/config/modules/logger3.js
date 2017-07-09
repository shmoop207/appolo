"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require("bluebird");
function default_1(options) {
    return (env, inject, logger2) => {
        let logger3 = {
            getName: function () {
                return logger2.getName() + "logger3";
            }
        };
        inject.addObject('logger3', logger3);
        return Q.delay(1);
    };
}
exports.default = default_1;
//# sourceMappingURL=logger3.js.map