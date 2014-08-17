var should = require('chai').should();
var appolo = require('../../index');


describe('bootstrap', function () {


    beforeEach(function (done) {
        appolo.launcher.launch({
            paths: ['config', 'server'],
            root: process.cwd() + '/test/mock'
        }, done);
    });

    afterEach(function () {
        appolo.launcher.reset();
    });


    it('should have  call bootstrap initialize', function () {
        var injector = appolo.inject;

        var bootstrap = injector.getObject('appolo-bootstrap');

        should.exist(bootstrap);
        should.exist(bootstrap.manager);
        bootstrap.working.should.be.ok;
    });
});