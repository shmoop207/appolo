import * as chai from 'chai';
import * as request from 'supertest';
import {Promises} from '@appolo/utils';
import {Methods, Hooks} from '@appolo/route';
import {App, createApp} from '../../index';
import {DefineController} from "../mock/src/controllers/defineController";
import {EnvController} from "../mock/src/controllers/envController";
import {MiddlewareController} from "../mock/src/controllers/middlewareController";
import {AuthMiddleware} from "../mock/src/middleware/authMiddleware";
import {TestMiddleware} from "../mock/src/middleware/middleware";
import {ErrorMiddleware} from "../mock/src/middleware/errorMiddleware";
import sinon = require("sinon");
import qs = require("qs");
import sinonChai = require("sinon-chai");
import httpChai = require("chai-http");

let should = chai.should();
chai.use(httpChai);
chai.use(sinonChai);


describe('Appolo e2e', () => {
    let app: App;

    beforeEach(async () => {
        app = createApp({
            port: 8183,
            environment: "testing",
            //qsParser: (str) => qs.parse(str),
            root: process.cwd() + '/test/mock/',
        });

        await app.launch();
    });

    afterEach(async () => {
        await app.reset();
    });

    describe('define', function () {

        beforeEach(() => {
            app.route.createRoute<DefineController>('defineController')
                .path('/test/define/linq_object')
                .method(Methods.GET)
                .action(c => c.test);

            app.route.createRoute<DefineController>(DefineController)
                .path('/test/define/linq')
                .action('test')
                .role("aaa");


            app.route.createRoute<DefineController>('defineController')
                .path('/test/define/fluent_method')
                .method(Methods.GET)
                .action(c => c.test);
            app.route.createRoute<DefineController>('defineController')
                .path('/test/define/fluent')
                .action('test')
                .role("aaa")
        });

        it('should call define controller from  linq object', async () => {

            let res = await request(app.route.handle)
                .get('/test/hello')

            res.should.to.have.status(200);

            res.should.to.be.json;

            should.exist(res.body);

            res.body.test.should.be.eq("hello");

            res.body.name.should.be.eq('HelloController')

        });

        it('should  call define controller from linq', async () => {

            let res = await request(app.route.handle)
                .get('/test/define/linq/?userName=11');

            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.working.should.be.ok;

            res.body.controllerName.should.be.eq('defineController');

            res.body.model.userName.should.ok;
        });

        it('should  call define controller from  fluent method', async () => {

            let res = await request(app.route.handle)
                .get('/test/define/fluent_method/?userName=11');


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.working.should.be.ok;

            res.body.controllerName.should.be.eq('defineController');

            res.body.model.userName.should.ok;
        });

        it('should  call controller from linq fluent', async () => {

            let res = await request(app.route.handle)
                .get('/test/define/fluent/?userName=11')


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.working.should.be.ok;

            res.body.controllerName.should.be.eq('defineController');

            res.body.model.userName.should.ok;
        });
    });

    describe('env', function () {

        beforeEach(() => {
            app.route.createRoute<EnvController>(EnvController)
                .path("/test/env/not_in_env/")
                .action(c => c.test)
                .environment("test");


            app.route.createRoute<EnvController>(EnvController)
                .path("/test/env/")
                .action(c => c.test)
                .environment("testing");
        })

        it('should not call route with env if not in environments', async () => {

            let res = await request(app.route.handle)
                .get('/test/env/not_in_env/');


            res.should.to.have.status(404);
        });


        it('should call route with env', async () => {

            let res = await request(app.route.handle)
                .get('/test/env/');


            res.should.to.have.status(200);
        });
    });


    describe('error', function () {
        it('should  call  custom error', async () => {

            let res = await request(app.route.handle)
                .get('/test/error/');


            res.should.to.have.status(503);
            res.should.to.be.json;

            should.exist(res.body)

            res.body.data.should.be.eq("erroraaaa");
        });

        it('should  call  custom error global', async () => {

            await app.reset();

            app = createApp({
                port: 8183,
                environment: "testing",
                root: process.cwd() + '/test/mock/',
            });

            app.route.error(ErrorMiddleware);

            await app.launch();


            let res = await request(app.route.handle)
                .get('/test/error2/');


            res.should.to.have.status(503);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.data.should.be.eq("erroraaaa");
        });


        it('should  call with stack error', async () => {

            await app.reset();

            app = createApp({
                port: 8183,
                environment: "testing", errorStack: true,
                root: process.cwd() + '/test/mock/',
            });

            await app.launch();


            let res = await request(app.route.handle)
                .get('/test/error3/');


            res.should.to.have.status(500);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.error.should.include("Error: some error");
        });
    });

    describe('custom app use', function () {

        it('should  call  use with path', async () => {

            await app.reset();

            app = createApp({
                port: 8183,
                environment: "testing",
                root: process.cwd() + '/test/mock/',
            });

            app.route.use("/test/path", function (req, res, next) {
                res.send("aaa");
            });

            await app.launch();


            let res = await request(app.route.handle)
                .get('/test/path');


            res.should.to.have.status(200);


            res.text.should.be.eq("aaa");

            let res2 = await request(app.route.handle)
                .get('/test/path2');

            res2.should.to.have.status(404);
        });


    });


    describe('hooks', function () {

        it('should  call onResponse global hook', async () => {

            await app.reset();

            app = createApp({
                port: 8183,
                environment: "testing",
                root: process.cwd() + '/test/mock/',
            });

            app.route.error(ErrorMiddleware);

            let spy = sinon.spy();
            app.route.hooks.onResponse(spy);

            await app.launch();


            let res = await request(app.route.handle)
                .get('/test/error2/');


            res.should.to.have.status(503);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.data.should.be.eq("erroraaaa");

            spy.should.have.been.calledOnce;
        });

        it('should  call pre middleware hook global', async () => {

            await app.reset();

            app = createApp({
                port: 8183,
                environment: "testing",
                root: process.cwd() + '/test/mock/',
            });


            app.route.hooks.onPreMiddleware(function (req, res, next) {
                req.model = {c: 112};

                next();
            });

            await app.launch();


            let res = await request(app.route.handle)
                .get('/test/hooks/');


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body)

            res.body.query.c.should.be.eq(112);

        });

        it('should  call pre middleware hook on route', async () => {

            let res = await request(app.route.handle)
                .get('/test/hooks/');


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body)

            res.body.query.a.should.be.eq(11);

        });


    })


    describe('gzip', function () {
        it('should  call  controller with gzip', async () => {

            let res = await request(app.route.handle)
                .get('/test/gzip/');


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);
            res.header["content-encoding"].should.be.eq("gzip")

            res.body.working.should.be.ok;
        });

        it('should  call  controller with gzip decorator', async () => {

            let res = await request(app.route.handle)
                .get('/test/gzip/decorator');


            res.should.to.have.status(201);
            res.should.to.be.json;

            should.exist(res.body)
            res.header["content-encoding"].should.be.eq("gzip")
            res.header["x-test"].should.be.eq("true")
            res.header["x-test2"].should.be.eq("222")

            res.body.working.should.be.ok;
        });


        it('should  call  controller with gzip async ', async () => {

            let res = await request(app.route.handle)
                .get('/test/gzip_async/')


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body)
            res.header["content-encoding"].should.be.eq("gzip")

            res.body.working.should.be.ok;
        });


        it('should  call call controller with compression', async () => {

            let res = await request(app.route.handle)
                .get('/test/compression/')


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body)

            res.body.working.should.be.ok;
            res.header["content-encoding"].should.be.eq("gzip")

        });
    });

    describe('custom decorators', function () {
        it('should  call  with custom decorators', async () => {

            let res = await request(app.route.handle)
                .post('/test/custom/params/111').send({test: "aaaa"});


            res.should.to.have.status(200);
            res.should.to.be.json;
            should.exist(res.body);

            res.body.working.should.be.eq("aaaa");
            res.body.userAgent.should.be.include("node-superagent");
            res.body.id.should.be.include("111");
        });
    });

    describe('middleware', function () {
        beforeEach(() => {
            app.route.createRoute<MiddlewareController>(MiddlewareController)
                .path('/test/middleware/function')
                .method(Methods.GET)
                .action('fn')
                .middleware(function (req, res, next) {
                    (req as any).working = true
                    next()
                });

            app.route.createRoute<MiddlewareController>(MiddlewareController)
                .path('/test/middleware/objectId')
                .method(Methods.GET)
                .action('test')
                .middleware('testMiddleware');


            app.route.createRoute<MiddlewareController>(MiddlewareController)
                .path('/test/middleware/class')
                .method(Methods.GET)
                .action('test')
                .middleware(TestMiddleware);

            app.route.createRoute<MiddlewareController>(MiddlewareController)
                .path('/test/middleware/auth')
                .method(Methods.GET)
                .action('test')
                .middleware(AuthMiddleware);
        })

        it('should  call middleware with function before controller', async () => {


            let res = await request(app.route.handle)
                .get('/test/middleware/function');


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body)

            res.body.working.should.be.ok;
        });


        it('should  call auth middleware before controller', async () => {

            let res = await request(app.route.handle)
                .get('/test/middleware/auth/');


            res.should.to.have.status(401);

            should.exist(res.text);

            res.text.should.be.eq('{"statusCode":401,"message":"Unauthorized","code":201,"error":"NOT AUTHORIZED"}')

        });

        it('should  call middleware before controller with class', async () => {

            let res = await request(app.route.handle)
                .get('/test/middleware/class')


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.working.should.be.ok;

            res.body.middleware.should.be.ok;
            res.body.name.should.be.eq("Manager")
        });

        it('should  call middleware by order', async () => {

            let res = await request(app.route.handle)
                .get('/test/middleware/order')


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.working.should.be.eq("working1working2");

        });


        it('should  call middleware before controller with objectId', async () => {

            let res = await request(app.route.handle)
                .get('/test/middleware/objectId');


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body)

            res.body.working.should.be.ok;

            res.body.middleware.should.be.ok
            res.body.name.should.be.eq("Manager")
        });

    });

    describe('module', function () {


        it('should call controller with modules ', async () => {


            let res = await request(app.route.handle)
                .get('/test/module/');

            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.logger.should.be.ok;

            res.body.logger.should.be.eq("testinglogger2testinglogger3");
        });

        it('should call controller with external modules ', async () => {


            let res = await request(app.route.handle)
                .get('/test/monitor');

            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.ok.should.be.eq(true);
            res.body.type.should.be.eq("testing");

        });
    });

    describe('params', function () {
        it('should  call controller from with params', async () => {

            let res = await request(app.route.handle)
                .get('/test/params/aaa/bbb/?userName=11');


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.working.should.be.ok;

            res.body.controllerName.should.be.eq('paramsController');

            res.body.model.userName.should.ok;
            res.body.manager.should.be.eq("Manager4");
            res.body.name.should.be.eq("aaa");
            res.body.name2.should.be.eq("bbb");

        });

        it('should  call controller from with params middle', async () => {

            let res = await request(app.route.handle)
                .get('/test/params/aaa/test/bbb/?userName=11');


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.working.should.be.ok;

            res.body.controllerName.should.be.eq('paramsController');

            res.body.model.userName.should.ok;
            res.body.manager.should.be.eq("Manager4");
            res.body.name.should.be.eq("aaa");
            res.body.name2.should.be.eq("bbb");

        });
    });

    describe('static', function () {
        it('should should serve static', async () => {
            let res = await request(app.route.handle)
                .get('/test.html')

            res.should.to.have.status(200);

            res.text.should.be.match(/aaa/)
            res.type.should.be.match(/text\/html/)
        })
    })


    describe('promise', function () {
        it('should should call promise', async () => {
            let res = await request(app.route.handle)
                .get('/test/promise')

            res.should.to.have.status(200);

            res.body.working.should.be.eq("working")

        })

        it('should should call promise with error', async () => {
            let res = await request(app.route.handle)
                .get('/test/promise/error')

            res.should.to.have.status(500);

            res.body.message.should.be.eq("Internal Server Error")

        })

        it('should should call promise with no error', async () => {
            let res = await request(app.route.handle)
                .get('/test/promise/no_error')

            res.should.to.have.status(400);

            res.body.message.should.be.eq("Bad Request")
            res.body.a.should.be.eq(1);
            res.body.code.should.be.eq(123)


        })
    })

    describe('query', function () {
        it('should should have query params', async () => {

            let res = await request(app.route.handle)
                .get(`/test/query?test=1&test2[]=2&test2[]=3&test3[]=${encodeURIComponent("http://test.com")}`)

            res.should.to.have.status(200);

            res.body.test.should.be.eq("1")
            res.body.test2[1].should.be.eq("3")
            res.body.test3[0].should.be.eq("http://test.com")
        });

        it('should should have query params with #', async () => {
            let res = await request(app.route.handle)
                .get(`/test/query/?test=1&test2[]=2&test2[]=3&test3[]=${encodeURIComponent("http://test.com")}#aaa`)

            res.should.to.have.status(200);

            res.body.test.should.be.eq("1")
            res.body.test2[1].should.be.eq("3")
            res.body.test3[0].should.be.eq("http://test.com")
        });
    });

    describe('protocol', function () {
        it('should should have protocol on request', async () => {
            let res = await request(app.route.handle)
                .get(`/test/protocol`)

            res.should.to.have.status(200);

            res.body.host.should.be.includes("127.0.0.1");
            res.body.protocol.should.be.eq("http");
            res.body.secure.should.be.eq(false)
        });

        it('should should have protocol on request with proxy', async () => {
            let res = await request(app.route.handle)
                .get(`/test/protocol`)
                .set('X-Forwarded-Host', 'test.com')
                .set('X-Forwarded-Proto', 'https')
                .send();

            res.should.to.have.status(200);

            res.body.host.should.be.includes("test.com");
            res.body.protocol.should.be.eq("https");
            res.body.secure.should.be.eq(true)
        });


    });

    describe('cookie', function () {

        it('should should have cookie', async () => {

            const agent = request.agent(app.route.handle);


            let res = await agent
                .get(`/test/cookie/?aa=bb`)

            res.should.to.have.status(200);
            res.header["set-cookie"][0].should.be.eq("cookie=hey; Path=/; Expires=Mon, 01 Feb 2100 00:00:00 GMT");

            let res2 = await agent
                .get(`/test/cookie/?aa=bb`)

            res2.body.cookie.should.be.eq("hey")
        })

        it('should should have cookie json', async () => {

            const agent = request.agent(app.route.handle);


            let res = await agent
                .get(`/test/cookie_json/?aa=bb`)

            res.should.to.have.status(200);
            res.header["set-cookie"][0].should.be.eq("cookie=j%3A%7B%22test%22%3A%22working%22%7D; Path=/; Expires=Mon, 01 Feb 2100 00:00:00 GMT");

            let res2 = await agent
                .get(`/test/cookie_json/?aa=bb`)

            res2.body.cookie.test.should.be.eq("working")
        })

        it('should should clear cookie', async () => {

            const agent = request.agent(app.route.handle);


            let res = await agent
                .get(`/test/cookie_json/?aa=bb`)

            res.should.to.have.status(200);
            res.header["set-cookie"][0].should.be.eq("cookie=j%3A%7B%22test%22%3A%22working%22%7D; Path=/; Expires=Mon, 01 Feb 2100 00:00:00 GMT");

            let res2 = await agent
                .get(`/test/cookie_clear/?aa=bb`)

            res2.header["set-cookie"][0].should.be.eq("cookie=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT");
        })
    });

    describe('redirect', () => {
        it("should redirect to path", async () => {
            let res = await request(app.route.handle)
                .get('/test/redirect/').redirects(2)

            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.name.should.be.eq("redirectTo")
        })
    })

    describe('root', function () {
        xit('should should call route *', async () => {

            let res = await request(app.route.handle)
                .get('/test222/')

            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.name.should.be.eq("all")

        });

        it('should should call route /', async () => {

            let res = await request(app.route.handle)
                .get('/');

            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.name.should.be.eq("root")

        });

        it('should should call route with end', async () => {

            let res = await request(app.route.handle)
                .get('/raw');

            res.should.to.have.status(200);

            should.exist(res.body);

            res.text.should.be.eq("raw")

        });

        it('should should call with route not found', async () => {

            let res = await request(app.route.handle)
                .get('/test/route2222/?user2_name=11');

            res.should.to.have.status(404);

            should.exist(res.text);

            res.text.should.contain("/test/route2222/")
        });
    });
    describe('decorator route controller', function () {
        it('should call decorator route controller ', async () => {
            let res = await request(app.route.handle)
                .get(`/test/decorator/route/aaa/bbb?test=${encodeURIComponent("http://www.cnn.com")}`);


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.model.test.should.be.eq("http://www.cnn.com");
            res.body.model.name.should.be.eq("aaa");
        });

        it('should call decorator2 route controller ', async () => {
            let res = await request(app.route.handle)
                .get(`/test/decorator2/route/aaa/bbb?test=${encodeURIComponent("http://www.cnn.com")}`);


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.model.test.should.be.eq("http://www.cnn.com");
            res.body.model.name.should.be.eq("aaa");
        })
    })

    describe('decorator param controller', function () {
        it('should call decorator param controller ', async () => {
            let res = await request(app.route.handle)
                .get(`/test/decorator/param/aaa/bbb?test=${encodeURIComponent("http://www.cnn.com")}`);

            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.name.should.be.eq("Manager");
            res.body.model.should.be.eq("testing");
            res.body.user.should.be.eq("user");
        })
    })

    describe('static controller', function () {
        it('should  call controller twice', async () => {

            let res = await request(app.route.handle)
                .get('/test/static/controller/aaa/bbb/?userName=11');

            let res2 = await request(app.route.handle)
                .get('/test/static/controller/aaa/bbb/?userName=11');


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.model.should.be.ok;


            res.body.model.userName.should.ok;
            res.body.model.name.should.be.eq("aaa");
            res.body.model.name2.should.be.eq("bbb");
            res.body.model.userName.should.be.eq("11");

            res2.body.model.userName.should.ok;
            res2.body.model.name.should.be.eq("aaa");
            res2.body.model.userName.should.be.eq("11");

        });

        it('should call static controller ', async () => {

            let res = await request(app.route.handle)
                .get(`/test/static/controller/aaa/bbb?test=${encodeURIComponent("http://www.cnn.com")}`);


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.model.test.should.be.eq("http://www.cnn.com");
            res.body.model.name.should.be.eq("aaa");
        });

        it('should call static post controller ', async () => {

            let res = await request(app.route.handle)
                .post(`/test/static/controller/aaa/bbb/post?test=${encodeURIComponent("http://www.cnn.com")}`)
                .send({"testPost": true});


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.model.test.should.be.eq("http://www.cnn.com");
            res.body.model.name.should.be.eq("aaa");
            res.body.model.testPost.should.be.eq(true);
        });
    });

    describe('validations', function () {


        it('should call validations ', async () => {

            let res = await request(app.route.handle)
                .get('/test/validations/auth/?username=aaa&password=1111');


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.username.should.be.ok;
        });

        it('should call validations nested ', async () => {

            let res = await request(app.route.handle)
                .get('/test/nested/?username=aaa&password=1111');


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.model.username.should.be.ok;

        });


    });

    describe('json', function () {
        it('should should call route and get json', async () => {

            let res = await request(app.route.handle)
                .get('/test/json/?aaa=bbb&ccc=ddd');

            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.query.should.be.ok;
            res.body.query.aaa.should.be.eq("bbb");
            res.body.query.ccc.should.be.eq("ddd");

        });

        it('should should call route and get json', async () => {

            let res = await request(app.route.handle)
                .post('/test/json/')
                .send({aaa: "bbb", ccc: "ddd"})

            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.body.should.be.ok;
            res.body.body.aaa.should.be.eq("bbb");
            res.body.body.ccc.should.be.eq("ddd");

        });

    });


    describe('methods', function () {
        it('should  call controller Options', async () => {

            let res = await request(app.route.handle)
                .options('/test/params/aaa/bbb/?userName=11');

            res.should.to.have.status(204);
            res.header["access-control-allow-origin"].should.be.eq('*');
            res.header["content-length"].should.be.eq('0');

            res.text.should.be.eq("")
        });

        it('should call controller Head', async () => {

            let res = await request(app.route.handle)
                .head('/test/params/aaa/bbb/?userName=11');

            res.should.to.have.status(200);
            res.header["access-control-allow-origin"].should.be.eq('*');
            res.header["content-length"].should.be.eq('153');
            res.header["content-type"].should.be.eq('application/json; charset=utf-8');

            should.not.exist(res.text);
        });


        it('should call controller empty response', async () => {

            let res = await request(app.route.handle)
                .get('/test/params/empty/aaa/bbb/?userName=11');

            res.should.to.have.status(204);
            res.header["access-control-allow-origin"].should.be.eq('*');
            res.header["content-length"].should.be.eq('0');
            should.not.exist(res.header["content-type"]);

            res.text.should.be.eq("");
        });

        it('should call controller delete', async () => {

            let res = await request(app.route.handle)
                .delete('/test/params/empty/aaa/bbb/?userName=11');

            res.should.to.have.status(204);
            res.header["access-control-allow-origin"].should.be.eq('*');
            res.header["content-length"].should.be.eq('0');
            should.not.exist(res.header["content-type"]);

            res.text.should.be.eq("");
        });

        it('should call controller put', async () => {

            let res = await request(app.route.handle)
                .put('/test/params/aaa/bbb/?userName=11');

            res.should.to.have.status(200);


            res.body.working.should.be.eq(true);
        });

        it('should call controller patch', async () => {

            let res = await request(app.route.handle)
                .patch('/test/params/aaa/bbb/?userName=11');

            res.should.to.have.status(200);


            res.body.working.should.be.eq(true);
        });


    })

    xdescribe('render', function () {
        it('should render view', async () => {

            let res = await request(app.route.handle)
                .get('/test/view?test=11');

            res.should.to.have.status(200);
            res.header["access-control-allow-origin"].should.be.eq('*');
            res.header["content-type"].should.be.eq('text/html;charset=utf-8');

            res.text.should.be.eq("hello 11");
        });

        it('should render view with path', async () => {

            let res = await request(app.route.handle)
                .get('/test/view2?test=11');

            res.should.to.have.status(200);
            res.header["access-control-allow-origin"].should.be.eq('*');
            res.header["content-type"].should.be.eq('text/html;charset=utf-8');

            res.text.should.be.eq("hello2 11");
        });
    });

    describe('pipeline', () => {
        it('should have add route with pipeline', async () => {

            let res = await request(app.route.handle)
                .get('/pipeline/aaa?bbb=1');

            res.should.to.have.status(200);
        })
    })

    describe('abstract', function () {
        it('should have abstract route with middleware', async () => {

            let res = await request(app.route.handle)
                .get('/test/abstract?test=11');

            res.should.to.have.status(200);

            res.body.working.should.be.eq("working1working2working3");
        });

        it('should have abstract route with diff base', async () => {

            let res = await request(app.route.handle)
                .get('/test2/abstract?test=11');

            res.should.to.have.status(200);

            res.body.working.should.be.eq("working1working2working3fromTest2");
        });

        it('should have run child controller with parent middlware on class', async () => {

            let res = await request(app.route.handle)
                .get('/child_controller');

            res.should.to.have.status(200);

            res.body.working.should.be.eq("undefinedworking2working3working1working5working4");
        });

    });

    xdescribe('context', function () {
        it('should get context from manager', async () => {


            let res = await request(app.route.handle)
                .get('/test/context?userName=bla');

            res.should.to.have.status(200);

            res.body.userName.should.be.eq("bla");

        });

        it('should get context from manager parallel', async () => {


            let [res, res2] = await Promise.all([request(app.route.handle).get('/test/context?userName=bla'), request(app.route.handle).get('/test/context?userName=foo')]);

            res.should.to.have.status(200);

            res.body.userName.should.be.eq("bla");

            res2.body.userName.should.be.eq("foo");

        });
    });

    describe('simple mode', function () {
        it('should handel simple mode request', async () => {

            let app2 = createApp();

            app2.route.get("test/simple", function (req, res) {
                res.send("ok")
            })

            await app2.launch();


            let res = await request(app2.route.handle)
                .get('/test/simple?test=11');

            res.should.to.have.status(200);

            res.text.should.be.eq("ok");

            await app2.reset();
        });
    });


});
