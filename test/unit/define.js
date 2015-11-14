"use strict";

var should = require('chai').should();
var appolo = require('../../index');


describe('define', function () {

    beforeEach(function (done) {
        appolo.launcher.launch({
            paths: ['config', 'server'],
            root: process.cwd() + '/test/mock'
        }, done);
    });

    afterEach(function () {
        appolo.launcher.reset();
    })

    it('should define class', function () {


        var $config = {
            id: 'test'
        }

        appolo.define($config, class Test {

        })

        var injector = appolo.inject;

        var test = injector.getObject('test');

        should.exist(test);


    });


    it('should define class namespace', function () {


        var $config = {
            id: 'test',
            namespace: 'Apoolo.Testing.Test'
        }
        var Test = class Test {

        }


        appolo.define($config, Test);


        should.exist(Apoolo.Testing.Test);

        var injector = appolo.inject;

        var test = injector.getObject('test');

        test.should.be.instanceof(Test);

        Apoolo.Testing.Test.should.be.eq(Test)


    });

    it('should define class statics', function () {

        var $config = {
            id: 'test',
            statics: {
                TEST: 1
            }
        }

        var Test = class Test {

            toString() {
                return this.TEST
            }
        }

        appolo.define($config, Test)

        var injector = appolo.inject;

        var test = injector.getObject('test');

        Test.TEST.should.be.eq(1);
        test.TEST.should.be.eq(1);
        test.toString().should.be.eq(1);


    });

    it('should define class static config', function () {
        var manager2 = appolo.inject.getObject('manager2');

        should.exist(manager2);
        should.exist(manager2.manager);
    })

    it('should define class with linq', function () {
        var manager3 = appolo.inject.getObject('manager3');

        should.exist(manager3);
        should.exist(manager3.manager);
        should.exist(Test.Manager3);


        manager3.TEST.should.be.eq(1)
        manager3.TEST2.should.be.eq(2)
        Test.Manager3.TEST2.should.be.eq(2)
    })

    it('should define only namespace', function () {

        class Test {

        }

        appolo.define(Test).namespace('Test1.Test2')

        should.exist(Test1.Test2);

        Test1.Test2.should.be.eq(Test)
    })

    it('should define only statics', function () {

        class Test {

        }

        appolo.define(Test).statics('Test1', 'Test2')

        Test.Test1.should.be.eq('Test2')
    })

    it('should define mixsins', function () {

        class Test {
            on(event, fn) {
                return true;
            }

            un(event, fn) {
                return true;
            }
        }

        class Test2 {

        }

        appolo.define(Test2).mixins(Test)

        var test = new Test2();
            test.on() .should.be.ok
    })

    it('should define mixsins with $config', function () {

        class Test {
            on(event, fn) {
                return true;
            }

            un(event, fn) {
                return true;
            }
        }

        class Test2 {

        }

        appolo.define({type:Test2,mixins:Test})

        var test = new Test2();
        test.on() .should.be.ok
    })

});