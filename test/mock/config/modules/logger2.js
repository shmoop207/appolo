"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger2 = void 0;
const utils_1 = require("@appolo/utils");
function logger2(options) {
    return async function (env, inject, logger) {
        let logger2 = {
            getName: function () {
                return env.test + "logger2";
            }
        };
        inject.addObject('logger2', logger2);
        return utils_1.Promises.delay(100);
    };
}
exports.logger2 = logger2;
//# sourceMappingURL=logger2.js.map