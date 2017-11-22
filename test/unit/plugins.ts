"use strict";
import appolo  = require('../../index');
import chai = require('chai')

let should = chai.should();

describe('plugins', function () {

    beforeEach(function (done) {
        appolo.launcher.launch({
            paths: ['config', 'server'],
            root: process.cwd() + '/test/mock'
        },done);
    });

    afterEach(function(){
        appolo.launcher.reset();
    })

    it('should initialize module', function () {
        let injector = appolo.inject;

        let logger = injector.getObject('logger');

        should.exist(logger);

        (logger as any).getName().should.be.eq("testDev");
    });


    it('should initialize module second module depend on the first module', function () {
        let injector = appolo.inject;

        let logger2 = injector.getObject('logger2');
        should.exist(logger2);
        (logger2 as any).getName().should.be.eq("testDevlogger2");
    });

    it('should initialize module async module depend on the second module', function () {
        let injector = appolo.inject;

        let logger3 = injector.getObject('logger3');
        should.exist(logger3);
        (logger3 as any).getName().should.be.eq("testDevlogger2logger3");
    });

    it('should initialize module final module depend on the async module', function () {
        let injector = appolo.inject;

        let logger = injector.getObject('logger5');
        should.exist(logger);
        (logger as any).getName().should.be.eq("testDevlogger2logger4logger5");
    });

    it('should initialize module final module depend on the async await module', function () {
        let injector = appolo.inject;

        let logger = injector.getObject('logger6');
        should.exist(logger);
        (logger as any).getName().should.be.eq("testDevlogger6");
    });

    it('should initialize module final module depend on the async await with inject module', function () {
        let injector = appolo.inject;

        let logger = injector.getObject('logger7');
        should.exist(logger);
        (logger as any).getName().should.be.eq("testDevtestDevlogger6logger7");
    });
});