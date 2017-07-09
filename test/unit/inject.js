"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo = require("../../index");
const chai = require("chai");
let should = chai.should();
describe('inject', function () {
    beforeEach(function (done) {
        appolo.launcher.launch({
            paths: ['config', 'server'],
            root: process.cwd() + '/test/mock'
        }, done);
    });
    afterEach(function () {
        appolo.launcher.reset();
    });
    it('should have  injector', function () {
        let injector = appolo.inject;
        should.exist(injector);
    });
    it('should have env in injector', function () {
        let injector = appolo.inject;
        let env = injector.getObject('env');
        should.exist(env);
        env.type.should.be.equal("development");
    });
    it('should have controller in injector', function () {
        let injector = appolo.inject;
        let controller = injector.getObject('controller');
        should.exist(controller);
        should.exist(controller.manager);
        controller.manager.run().should.be.ok;
        controller.logger2.getName().should.be.eq("testDevlogger2");
    });
    it('should  controller be singleton', function () {
        let injector = appolo.inject;
        let controller = injector.getObject('controller');
        let controller2 = injector.getObject('controller');
        let manager = injector.getObject('manager');
        let manager2 = injector.getObject('manager');
        (controller !== controller2).should.be.ok;
        (manager === manager2).should.be.ok;
    });
});
//# sourceMappingURL=inject.js.map