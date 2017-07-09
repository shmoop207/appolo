"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo = require("../../index");
const chai = require("chai");
let should = chai.should();
describe('plugins', function () {
    beforeEach(function (done) {
        appolo.launcher.launch({
            paths: ['config', 'server'],
            root: process.cwd() + '/test/mock'
        }, done);
    });
    afterEach(function () {
        appolo.launcher.reset();
    });
    it('should initialize module', function () {
        let injector = appolo.inject;
        let logger = injector.getObject('logger');
        should.exist(logger);
        logger.getName().should.be.eq("testDev");
    });
    it('should initialize module second module depend on the first module', function () {
        let injector = appolo.inject;
        let logger2 = injector.getObject('logger2');
        should.exist(logger2);
        logger2.getName().should.be.eq("testDevlogger2");
    });
    it('should initialize module async module depend on the second module', function () {
        let injector = appolo.inject;
        let logger3 = injector.getObject('logger3');
        should.exist(logger3);
        logger3.getName().should.be.eq("testDevlogger2logger3");
    });
    it('should initialize module final module depend on the async module', function () {
        let injector = appolo.inject;
        let logger = injector.getObject('logger5');
        should.exist(logger);
        logger.getName().should.be.eq("testDevlogger2logger4logger5");
    });
});
//# sourceMappingURL=plugins.js.map