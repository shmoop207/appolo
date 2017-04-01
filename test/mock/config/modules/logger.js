"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require("bluebird");
function default_1(env, inject) {
    let logger = {
        getName: function () {
            return env.test;
        }
    };
    inject.addObject('logger', logger);
    return Q.delay(100);
}
exports.default = default_1;
//# sourceMappingURL=logger.js.map