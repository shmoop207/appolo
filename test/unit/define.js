"use strict";

var should = require('chai').should();
var appolo = require('../../index');


describe('define', function () {

    beforeEach(function (done) {
        appolo.launcher.launch({
            paths: ['config', 'server'],
            root: process.cwd() + '/test/mock'
        },done);
    });

    afterEach(function(){
        appolo.launcher.reset();
    })

    it('should define class', function () {


        var $config = {
            id:'test'
        }

       appolo.define($config,class Test{

       })

        var injector = appolo.inject;

        var test = injector.getObject('test');

        should.exist(test);


    });


    it('should define class namespace', function () {


        var $config = {
            id:'test',
            namespace:'Apoolo.Testing.Test'
        }
        var Test = class Test{

        }


        appolo.define($config,Test);


        should.exist(Apoolo.Testing.Test);

        var injector = appolo.inject;

        var test = injector.getObject('test');

        test.should.be.instanceof(Test);

        Apoolo.Testing.Test.should.be.eq(Test)


    });

    it('should define class statics', function () {

        var $config = {
            id:'test',
            statics:{
                TEST:1
            }
        }

        var Test = class Test{

            toString(){
                return this.TEST
            }
        }

        appolo.define($config,Test)

        var injector = appolo.inject;

        var test = injector.getObject('test');

        Test.TEST.should.be.eq(1);
        test.TEST.should.be.eq(1);
        test.toString().should.be.eq(1);


    });



});