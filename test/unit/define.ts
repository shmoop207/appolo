"use strict";

let should = require('chai').should();
import appolo = require('../../index');
import Manager2 =require("../mock/server/manager2");
import Manager3 from "../mock/server/manager3";


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


        let $config = {
            id: 'test'
        }

        appolo.define($config, class Test {

        })

        let injector = appolo.inject;

        let test = injector.getObject('test');

        should.exist(test);


    });


    it('should define class namespace', function () {


        let $config = {
            id: 'test',
            namespace: 'Apoolo.Testing.Test'
        };

        class Test {

        }


        appolo.define($config, Test)


        should.exist((<any>global).Apoolo.Testing.Test);

        var injector = appolo.inject;

        var test = injector.getObject('test');

        test.should.be.instanceof(Test);

        (<any>global).Apoolo.Testing.Test.should.be.eq(Test)


    });

    it('should define class statics', function () {

        let $config = {
            id: 'test',
            statics: {
                TEST: 1
            }
        }

         class Test {
            TEST:number;
            toString() {
                return this.TEST
            }
        }

        appolo.define($config, Test);

        let injector = appolo.inject;

        let test = injector.getObject<Test>('test');

        (Test as any).TEST.should.be.eq(1);
        test.TEST.should.be.eq(1);
        test.toString().should.be.eq(1);


    });

    it('should define class static config', function () {
        let manager2 = appolo.inject.getObject<Manager2>('manager2');

        should.exist(manager2);
        should.exist(manager2.manager);
        manager2.manager.run().should.be.ok;
    })

    it('should define class with linq', function () {
        let manager3 = appolo.inject.getObject<Manager3>('manager3');

        should.exist(manager3);
        should.exist(manager3.manager);
        manager3.manager.run().should.be.ok;
        should.exist((<any>global).Test.Manager3);


        manager3.TEST.should.be.eq(1);
        manager3.TEST2.should.be.eq(2);
        (global as any).Test.Manager3.TEST2.should.be.eq(2)
    });

    it('should define only namespace', function () {

        class Test {

        }

        appolo.define(Test).namespace('Test1.Test2')

        should.exist((global as any).Test1.Test2);

        (global as any).Test1.Test2.should.be.eq(Test)
    });

    it('should define only statics', function () {

        class Test {

        }

        appolo.define(Test).statics('Test1', 'Test2');

        (Test as any).Test1.should.be.eq('Test2')
    });

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

        appolo.define(Test2).mixins(Test);

        let test = new Test2();
        (test as any).on() .should.be.ok
    });




});