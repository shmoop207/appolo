"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(options) {
    return (env, inject, logger, next) => {
        let logger2 = {
            getName: function () {
                return env.test + "logger2" + logger.getName();
            }
        };
        inject.addObject('logger2', logger2);
        next();
    };
}
exports.default = default_1;
//# sourceMappingURL=logger2.js.map