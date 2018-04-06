// import    chai = require('chai');
// import    sinon = require('sinon');
// import    appolo = require('../../index');
// import {Manager} from "../mock/server/manager/manager";
// import {Manager3} from "../mock/server/manager/manager3";
// import {Manager4} from "../mock/server/manager/manager4";
// import {Util} from "../../lib/util/util";
// import * as Url from "url";
// import * as querystring from "querystring";
// import {Manager6} from "../mock/server/manager/manager6";
// import {Manager7} from "../mock/server/manager/manager7";
// import {Manager8} from "../mock/server/manager/manager8";
// import sinonChai = require("sinon-chai");
//
// let should = chai.should()
// chai.use(sinonChai);
//
//
// describe('Appolo Express Unit', () => {
//
//     describe("basic test", () => {
//
//         beforeEach(async () => {
//             return appolo.launcher.launch({
//                 paths: ['config', 'server'],
//                 environment: "testing",
//                 root: process.cwd() + '/test/mock',
//                 port: 8183
//             });
//         });
//
//         afterEach(() => {
//             appolo.launcher.reset();
//         });
//
//         it("should have app", () => {
//
//             let app = appolo.injector.getObject('app');
//
//             should.exist(app);
//             should.exist(appolo.launcher.handleRequest)
//         });
//
//         it("should have managers", () => {
//
//             let manager = appolo.container.getObject<Manager>('manager');
//
//             should.exist(manager);
//             should.exist(manager.manager2);
//             should.exist(manager.manager3);
//             should.exist(manager.manager3.manager2)
//
//         });
//
//         it("should have manager with inherit", () => {
//
//             let manager = appolo.container.getObject<Manager4>('manager4');
//
//             should.exist(manager);
//             should.exist(manager.env);
//             should.exist(manager.logger);
//             should.not.exist((manager as any).manager4);
//
//             manager.env.test.should.be.eq("testing")
//
//         });
//
//         it("should have manager with valid inherit ", () => {
//
//             let manager = appolo.container.getObject<Manager6>('manager6');
//
//             should.exist(manager);
//             should.exist(manager.env);
//             should.exist(manager.logger);
//             manager.env.test.should.be.eq("testing");
//             should.not.exist((manager as any).manager3);
//         });
//
//         it("should have manager with valid inherit with define", () => {
//
//             let manager7 = appolo.container.getObject<Manager7>('manager7');
//             let manager8 = appolo.container.getObject<Manager8>('manager8');
//
//             should.exist(manager7);
//             should.exist(manager7.env);
//             should.exist(manager7.logger);
//             should.exist(manager7.manager4);
//             manager7.env.test.should.be.eq("testing");
//             manager7.name.should.be.eq("Manager7");
//
//
//             should.not.exist((manager7 as any).manager3);
//             should.not.exist((manager7 as any).manager6);
//
//             should.exist(manager8);
//             should.exist(manager8.manager6);
//             should.exist(manager8.manager4);
//             manager8.env.test.should.be.eq("testing");
//             manager8.name.should.be.eq("Manager8");
//             manager8.initCout.should.be.eq(2)
//
//         });
//
//         it("should have manager statics", function () {
//
//             let manager = appolo.container.getObject<Manager3>('manager3');
//
//             manager.TEST.should.be.eq(1)
//
//         });
//
//         it("should have manager singleton", function () {
//
//             let manager = appolo.container.getObject<Manager4>('manager4');
//             let manager2 = appolo.container.getObject<Manager4>('manager4');
//
//             (manager === manager2).should.be.ok;
//
//         });
//
//         it("should have manager namespace", function () {
//
//             should.exist((global as any).TEST.Manager3)
//
//         });
//
//         it("should have valid env", function () {
//
//             let env = appolo.container.getObject<appolo.IEnv>('env');
//
//             (env === appolo.environment).should.be.ok;
//
//             env.type.should.be.eq("testing")
//
//         })
//
//
//     });
// });
//
// // import Benchmark = require('benchmark');
// // import qs = require('qs');
// //
// // let suite = new Benchmark.Suite;
// // suite.
// // add('vanilla', function() {
// //     Util.parseQsFast("aa[]=bb&aa[]=cc&a=1&b=2&c=3&c=3&ss=45&ss=46&dg=gfdgfd&dfdfdfds=2222&test[ggg]=bbb")
// // }).add('qs', function() {
// //    qs.parse("aa[]=bb&aa[]=cc&a=1&b=2&c=3&c=3&ss=45&ss=46&dg=gfdgfd&dfdfdfds=2222&test[ggg]=bbb",{allowDots:false,depth:0})
// // }).add('node', function() {
// //     let a = Util.parseQsFast2("aa[]=bb&aa[]=cc&a=1&b=2&c=3&c=3&ss=45&ss=46&dg=gfdgfd&dfdfdfds=2222&test[ggg]=bbb")
// // })
// // .add('url', function() {
// //     let {query, pathName} = Util.parseUrlFast("/fdfdf/dfdfdfdgfgf/gfgdgf?aa[]=bb&aa[]=cc&a=1&b=2&c=3&c=3&ss=45&ss=46&dg=gfdgfd&dfdfdfds=2222&test[ggg]=bbb");
// //     querystring.parse(query);
// // })
// // .add('url node', function() {
// //     let a = Url.parse("/fdfdf/dfdfdfdgfgf/gfgdgf?aa[]=bb&aa[]=cc&a=1&b=2&c=3&c=3&ss=45&ss=46&dg=gfdgfd&dfdfdfds=2222&test[ggg]=bbb",true)
// // })
// //
// //
// //     .on('cycle', function(event) {
// //     console.log(String(event.target));
// // }).run();