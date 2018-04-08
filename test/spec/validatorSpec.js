"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const request = require("supertest");
const index_1 = require("../../index");
const should = chai.should();
describe('Appolo Express Unit', () => {
    describe('validations', () => {
        let app;
        afterEach(async () => {
            await app.reset();
        });
        it('should remove unknown fields from model', async () => {
            app = await new index_1.App({
                environment: 'testing',
                root: process.cwd() + '/test/mock',
                port: 8183
            }).launch();
            let res = await request(app.handle)
                .get('/test/validations?userName=jon&anotherOne=shouldnotbe');
            res.should.have.status(200);
            res.should.be.json;
            should.exist(res.body);
            res.body.model.should.be.deep.equal({ userName: 'jon' });
        });
        it('should still keep unknown fields from model', async () => {
            app = await new index_1.App({
                environment: 'testing',
                root: process.cwd() + '/test/mock',
                port: 8183,
                validatorOptions: {
                    stripUnknown: {
                        arrays: false,
                        objects: true
                    }
                }
            }).launch();
            let res = await request(app.handle)
                .get('/test/validations?userName=jon&anotherOne=shouldnotbe');
            res.should.have.status(200);
            res.should.be.json;
            should.exist(res.body);
            res.body.model.should.be.deep.equal({ userName: 'jon' });
        });
        it('should still keep unknown fields from model', async () => {
            app = await new index_1.App({
                environment: 'testing',
                root: process.cwd() + '/test/mock',
                port: 8183,
                validatorOptions: {
                    allowUnknown: true,
                    stripUnknown: false
                }
            }).launch();
            let res = await request(app.handle)
                .get('/test/validations?userName=jon&anotherOne=shouldnotbe');
            res.should.have.status(200);
            res.should.be.json;
            should.exist(res.body);
            res.body.model.should.be.deep.equal({ userName: 'jon', anotherOne: 'shouldnotbe' });
        });
    });
});
//# sourceMappingURL=validatorSpec.js.map