"use strict";
const logger_1 = require("./logger");
const logger2_1 = require("./logger2");
const logger3_1 = require("./logger3");
const index_1 = require("../../../../index");
const monitorModule_1 = require("./monitor/monitorModule");
const types_1 = require("appolo-agent/lib/types");
const hooksController_1 = require("../../src/controllers/hooksController");
module.exports = async function (env, app) {
    app.enableContext();
    let route = index_1.Util.getRouteDefinition(hooksController_1.HooksController, c => c.hooks);
    route.addHook(types_1.Hooks.PreMiddleware, function (req, res, next) {
        req.model = Object.assign({}, req.model, { a: 11 });
        next();
    });
    await app.module(logger_1.logger);
    await app.module(logger2_1.logger2({ test: 'test' }));
    await app.module(logger3_1.logger3({ test: 'test3' }), monitorModule_1.MonitorModule);
};
//# sourceMappingURL=all.js.map