"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo = require("../../../../index");
const logger_1 = require("./logger");
const logger2_1 = require("./logger2");
//module.exports = function(env){
appolo.use(logger_1.default);
appolo.use(logger2_1.default({ test: 'test' }));
//} 
//# sourceMappingURL=modules.js.map