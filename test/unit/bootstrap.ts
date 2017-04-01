import chai = require('chai');
import  appolo = require('../../index');
import {Bootstrap} from "../mock/server/bootstrap";
let should = chai.should();

describe('bootstrap', function () {


    beforeEach(function (done) {
        appolo.launcher.launch({
            paths: ['config', 'server'],
            root: process.cwd() + '/test/mock'
        }, done);
    });

    afterEach(function () {
        appolo.launcher.reset();
    });


    it('should have  call bootstrap initialize', function () {
        let injector = appolo.inject;

        let bootstrap = injector.getObject<Bootstrap>('appolo-bootstrap');

        should.exist(bootstrap);
        should.exist(bootstrap.manager);
        bootstrap.manager.run().should.be.ok;
        bootstrap.working.should.be.ok;
    });
});