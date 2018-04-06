"use strict";
// import chai = require('chai');
// import appolo = require('../../index');
// import request = require('supertest');
//
// const should = chai.should();
//
// describe('Appolo Express Unit', () => {
//
//     describe('validations', () => {
//
//         afterEach(() => {
//             appolo.launcher.reset();
//         });
//
//         it('should remove unknown fields from model', async () => {
//
//             await appolo.launcher.launch({
//                 paths: ['config', 'server'],
//                 environment: 'testing',
//                 root: process.cwd() + '/test/mock',
//                 port: 8183
//             });
//
//             let res = await request(appolo.launcher.handleRequest)
//                 .get('/test/validations?user_name=jon&another_one=shouldnotbe');
//
//             res.should.have.status(200);
//             res.should.be.json;
//
//             should.exist(res.body);
//
//             res.body.model.should.be.deep.equal({userName: 'jon'});
//         });
//
//         it('should still keep unknown fields from model', async () => {
//
//             await appolo.launcher.launch({
//                 paths: ['config', 'server'],
//                 environment: 'testing',
//                 root: process.cwd() + '/test/mock',
//                 port: 8183,
//                 validatorOptions: {
//                     stripUnknown: {
//                         arrays: false,
//                         objects: true
//                     }
//                 }
//             });
//
//             let res = await request(appolo.launcher.handleRequest)
//                 .get('/test/validations?user_name=jon&another_one=shouldnotbe');
//
//             res.should.have.status(200);
//             res.should.be.json;
//
//             should.exist(res.body);
//
//             res.body.model.should.be.deep.equal({userName: 'jon'});
//         });
//
//         it('should still keep unknown fields from model', async () => {
//
//             await appolo.launcher.launch({
//                 paths: ['config', 'server'],
//                 environment: 'testing',
//                 root: process.cwd() + '/test/mock',
//                 port: 8183,
//                 validatorOptions: {
//                     allowUnknown: true,
//                     stripUnknown: false
//                 }
//             });
//
//             let res = await request(appolo.launcher.handleRequest)
//                 .get('/test/validations?user_name=jon&another_one=shouldnotbe');
//
//             res.should.have.status(200);
//             res.should.be.json;
//
//             should.exist(res.body);
//
//             res.body.model.should.be.deep.equal({userName: 'jon', anotherOne: 'shouldnotbe'});
//         });
//
//     });
// });
//# sourceMappingURL=~validatorSpec.js.map