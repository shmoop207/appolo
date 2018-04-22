"use strict";
const logger_1 = require("./logger");
const logger2_1 = require("./logger2");
const logger3_1 = require("./logger3");
const monitorModule_1 = require("./monitor/monitorModule");
module.exports = async function (env, app) {
    await app.module(logger_1.logger);
    await app.module(logger2_1.logger2({ test: 'test' }));
    await app.module(logger3_1.logger3({ test: 'test3' }), monitorModule_1.MonitorModule);
};
//# sourceMappingURL=modules.js.map