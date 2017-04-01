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
        (logger2 as any).getName().should.be.eq("testDevlogger2testDev");
    });
});