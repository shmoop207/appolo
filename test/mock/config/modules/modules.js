"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo = require("../../../../index");
const logger_1 = require("./logger");
const logger2_1 = require("./logger2");
const logger3_1 = require("./logger3");
const logger4_1 = require("./logger4");
const logger5_1 = require("./logger5");
module.exports = function (env) {
    appolo.use(logger_1.default);
    appolo.use(logger2_1.default({ test: 'test2' }));
    appolo.use(logger3_1.default({ test: 'test3' }), true);
    appolo.use(logger4_1.default({ test: 'test4' }), true);
    appolo.use(logger5_1.default({ test: 'test5' }));
};
//# sourceMappingURL=modules.js.map