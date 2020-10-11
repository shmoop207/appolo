"use strict";
const logger_1 = require("./logger");
const logger2_1 = require("./logger2");
const logger3_1 = require("./logger3");
const monitorModule_1 = require("./monitor/monitorModule");
const testModule_1 = require("./test/testModule");
module.exports = async function (env, app) {
    await app.module.loadFn(logger_1.logger);
    await app.module.loadFn(logger2_1.logger2({ test: 'test' }), logger3_1.logger3({ test: 'test3' }));
    app.module.use(monitorModule_1.MonitorModule)
        .use(testModule_1.TestModule);
};
//# sourceMappingURL=all.js.map