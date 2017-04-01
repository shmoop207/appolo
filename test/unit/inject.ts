"use strict";
import appolo  = require('../../index');
import chai = require('chai')
import {IEnv} from "../../lib/IEnv";
import {Controller} from "../mock/server/controller";
import {Manager} from "../mock/server/manager";

let should = chai.should();

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
        let injector = appolo.inject;

        should.exist(injector)

    });

    it('should have env in injector', function () {
        let injector = appolo.inject;

        let env = injector.getObject<IEnv>('env');

        should.exist(env);

        env.type.should.be.equal("development")

    });

    it('should have controller in injector', function () {
        let injector = appolo.inject;

        let controller = injector.getObject<Controller>('controller');

        should.exist(controller);
        should.exist(controller.manager);
        controller.manager.run().should.be.ok;
        controller.logger2.getName().should.be.eq("testDevlogger2testDev")
    });

    it('should  controller be singleton', function () {
        let injector = appolo.inject;

        let controller = injector.getObject<Controller>('controller');
        let controller2 = injector.getObject<Controller>('controller');

        let manager = injector.getObject<Manager>('manager');
        let manager2 = injector.getObject<Manager>('manager');

        (controller !==controller2).should.be.ok;
        (manager === manager2).should.be.ok;


    });

});

