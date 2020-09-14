import    chai = require('chai');
import    appolo = require('../../index');
import sinonChai = require("sinon-chai");
import {Manager} from "../mock/src/manager/manager";
import {Manager3} from "../mock/src/manager/manager3";
import {Manager4} from "../mock/src/manager/manager4";
import {Manager6} from "../mock/src/manager/manager6";
import {Manager7} from "../mock/src/manager/manager7";
import {Manager8} from "../mock/src/manager/manager8";
import {App, createApp} from "../../index";

let should = chai.should()
chai.use(sinonChai);


describe('Appolo Express Unit', () => {

    describe("basic test", () => {

        let app: App

        beforeEach(async () => {
            app = createApp({
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

            let app2 = app.injector.getObject<App>('app');

            should.exist(app2);
            should.exist(app2.handle)
        });

        it("should have managers", () => {

            let manager = app.injector.getObject<Manager>('manager');

            should.exist(manager);
            should.exist(manager.manager2);
            should.exist(manager.manager3);
            should.exist(manager.manager3.manager2)

        });

        it("should have manager with inherit", () => {

            let manager = app.injector.getObject<Manager4>('manager4');

            should.exist(manager);
            should.exist(manager.env);
            should.exist(manager.logger);
            should.not.exist((manager as any).manager4);

            manager.env.test.should.be.eq("testing")

        });

        it("should have manager with valid inherit ", () => {

            let manager = app.injector.getObject<Manager6>('manager6');

            should.exist(manager);
            should.exist(manager.env);
            should.exist(manager.logger);
            manager.env.test.should.be.eq("testing");
            should.not.exist((manager as any).manager3);
        });

        it("should have manager with valid inherit with define", () => {

            let manager7 = app.injector.getObject<Manager7>('manager7');
            let manager8 = app.injector.getObject<Manager8>('manager8');

            should.exist(manager7);
            should.exist(manager7.env);
            should.exist(manager7.logger);
            should.exist(manager7.manager4);
            manager7.env.test.should.be.eq("testing");
            manager7.name.should.be.eq("Manager7");


            should.not.exist((manager7 as any).manager3);
            should.not.exist((manager7 as any).manager6);

            should.exist(manager8);
            should.exist(manager8.manager6);
            should.exist(manager8.manager4);
            manager8.env.test.should.be.eq("testing");
            manager8.name.should.be.eq("Manager8");

            manager8.initCout.should.be.eq(1)
            manager7.initCout.should.be.eq(1)

        });

        it("should have manager statics", function () {

            let manager = app.injector.getObject<Manager3>('manager3');

            manager.TEST.should.be.eq(1)

        });

        it("should have manager singleton", function () {

            let manager = app.injector.getObject<Manager4>('manager4');
            let manager2 = app.injector.getObject<Manager4>('manager4');

            (manager === manager2).should.be.ok;

        });


        it("should have valid env", function () {

            let env = app.injector.getObject<appolo.IEnv>('env');

            (env === app.environment).should.be.ok;

            env.type.should.be.eq("testing")

        })

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

