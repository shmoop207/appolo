var should = require('chai').should();
var appolo  = require('../../index');


describe('environments', function () {

    beforeEach(function(){

    })

    afterEach(function(){
        appolo.launcher.reset();
    })


    it('should create dev environment ', function (done) {

        appolo.launcher.launch({
            paths:['config', 'server'],
            root:process.cwd() +'/test/mock'
        },function(err){
            should.exist(appolo.environment.test);

            appolo.environment.test.should.be.equal("testDev")
            appolo.environment.type.should.be.equal("development")

            done();
        });




    });


    it('should create production environment ', function (done) {

        appolo.launcher.launch({
            paths:['config', 'server'],
            root:process.cwd() +'/test/mock',
            environment:'production'
        },function(){
            should.exist(appolo.environment.test);

            appolo.environment.test.should.be.equal("testProd")

            appolo.environment.type.should.be.equal("production")

            done();
        });




    });


    it('should create dev environment with deep config', function (done) {

        appolo.launcher.launch({
            paths:['config', 'server'],
            root:process.cwd() +'/test/mock'
        },function(){
            appolo.environment.test.should.be.equal("testDev")

            should.exist(appolo.environment.deep);

            appolo.environment.deep.test.should.be.equal("working");

            appolo.environment.deep.test2.should.be.equal("devWorking2");
            appolo.environment.deep.test3.should.be.equal("working3");

            done();
        });


    });

});