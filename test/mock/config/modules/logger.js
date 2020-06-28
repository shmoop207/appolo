"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
function logger(env, inject, callback) {
    let logger = {
        getName: function () {
            return env.test;
        }
    };
    inject.addObject('logger', logger);
    callback();
}
exports.logger = logger;
//# sourceMappingURL=logger.js.map