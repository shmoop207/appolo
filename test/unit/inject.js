var should = require('chai').should();
var appolo  = require('../../index');


describe('inject', function () {

    beforeEach(function(done){
        appolo.launcher.launch({
            paths:['config', 'server'],
            root:process.cwd() +'/test/mock'
        },done);
    });

    afterEach(function(){
        appolo.launcher.reset();
    });

    it('should have  injector', function () {
        var injector = appolo.inject;

        should.exist(injector)

    });

    it('should have env in injector', function () {
        var injector = appolo.inject;

        var env = injector.getObject('env');

        should.exist(env);

        env.type.should.be.equal("development")

    });

    it('should have controller in injector', function () {
        var injector = appolo.inject;

        var controller = injector.getObject('controller');

        should.exist(controller);
        should.exist(controller.manager);
    });

});

