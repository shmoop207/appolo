"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_utils_1 = require("appolo-utils");
function logger3(options) {
    return async function (env, inject) {
        let logger3 = {
            getName: function () {
                return env.test + "logger3";
            }
        };
        inject.addObject('logger3', logger3);
        return appolo_utils_1.Promises.delay(1);
    };
}
exports.logger3 = logger3;
//# sourceMappingURL=logger3.js.map