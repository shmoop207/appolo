"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const sinonChai = require("sinon-chai");
const index_1 = require("../../index");
let should = chai.should();
chai.use(sinonChai);
describe('Appolo Express Unit', () => {
    describe("basic test", () => {
        let app;
        beforeEach(async () => {
            app = index_1.createApp({
                environment: "testing",
                root: process.cwd() + '/test/mock',
                port: 8183
            });
            await app.launch();
        });
        afterEach(async () => {
            await app.reset();
        });
        it("should have app", () => {
            let app2 = app.injector.getObject('app');
            should.exist(app2);
            should.exist(app2.handle);
        });
        it('should have valid exported', function () {
            app.discovery.exported.length.should.be.gt(0);
        });
        it("should have managers", () => {
            let manager = app.injector.getObject('manager');
            should.exist(manager);
            should.exist(manager.manager2);
            should.exist(manager.manager3);
            should.exist(manager.manager3.manager2);
        });
        it("should have manager with inherit", () => {
            let manager = app.injector.getObject('manager4');
            should.exist(manager);
            should.exist(manager.env);
            should.exist(manager.logger);
            should.not.exist(manager.manager4);
            manager.env.test.should.be.eq("testing");
        });
        it("should have manager with valid inherit ", () => {
            let manager = app.injector.getObject('manager6');
            should.exist(manager);
            should.exist(manager.env);
            should.exist(manager.logger);
            manager.env.test.should.be.eq("testing");
            should.not.exist(manager.manager3);
        });
        it("should have manager with valid inherit with define", () => {
            let manager7 = app.injector.getObject('manager7');
            let manager8 = app.injector.getObject('manager8');
            should.exist(manager7);
            should.exist(manager7.env);
            should.exist(manager7.logger);
            should.exist(manager7.manager4);
            manager7.env.test.should.be.eq("testing");
            manager7.name.should.be.eq("Manager7");
            should.not.exist(manager7.manager3);
            should.not.exist(manager7.manager6);
            should.exist(manager8);
            should.exist(manager8.manager6);
            should.exist(manager8.manager4);
            manager8.env.test.should.be.eq("testing");
            manager8.name.should.be.eq("Manager8");
            manager8.initCout.should.be.eq(1);
            manager7.initCout.should.be.eq(1);
        });
        it("should have manager statics", function () {
            let manager = app.injector.getObject('manager3');
            manager.TEST.should.be.eq(1);
        });
        it("should have manager singleton", function () {
            let manager = app.injector.getObject('manager4');
            let manager2 = app.injector.getObject('manager4');
            (manager === manager2).should.be.ok;
        });
        it("should have valid env", function () {
            let env = app.injector.getObject('env');
            (env === app.environment).should.be.ok;
            env.type.should.be.eq("testing");
        });
        // it("convert model case", function () {
        //
        //     let  output = Util.convertModelToCamelCase({aa_bb:1,cc_dd_ff:2,ffGg:3})
        //
        //     output.aaBb.should.be.eq(1);
        //     output.ccDdFf.should.be.eq(2);
        //     output.ffGg.should.be.eq(3);
        //
        //
        // })
    });
});
//# sourceMappingURL=unitSpec.js.map