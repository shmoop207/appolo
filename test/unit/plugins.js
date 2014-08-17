var should = require('chai').should();
var appolo = require('../../index');


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
        var injector = appolo.inject;

        var logger = injector.getObject('logger');

        should.exist(logger);

        logger.getName().should.be.eq("testDev");
    });


    it('should initialize module second module depend on the first module', function () {
        var injector = appolo.inject;

        var logger2 = injector.getObject('logger2');
        should.exist(logger2);
        logger2.getName().should.be.eq("testDevlogger2");
    });
});