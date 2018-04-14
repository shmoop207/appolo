import * as chai from 'chai';
import * as request from 'supertest';
import {App, createApp, Methods, validator} from '../../index';
import {DefineController} from "../mock/src/controllers/defineController";
import {EnvController} from "../mock/src/controllers/envController";
import {MiddlewareController} from "../mock/src/controllers/middlewareController";
import {AuthMiddleware} from "../mock/src/middleware/authMiddleware";
import {TestMiddleware} from "../mock/src/middleware/middleware";

let should = chai.should();
chai.use(require("chai-http"))


describe('Appolo Http e2e', () => {
    let app: App;

    beforeEach(async () => {
        app = createApp({
            port: 8183,
            environment: "testing",
            root: process.cwd() + '/test/mock/',
        });

        await app.launch();
    });

    afterEach(async () => {
        await app.reset();
    });

    describe('define', function () {

        beforeEach(() => {
            app.route<DefineController>('defineController')
                .path('/test/define/linq_object')
                .method(Methods.GET)
                .action(c => c.test)
                .validations('userName', validator.string().required())

            app.route<DefineController>(DefineController)
                .path('/test/define/linq')
                .action('test')
                .role("aaa")
                .validations({'userName': validator.string().required()});


            app.route<DefineController>('defineController')
                .path('/test/define/fluent_method')
                .method(Methods.GET)
                .action(c => c.test)
                .validations('userName', validator.string().required())
            app.route<DefineController>('defineController')
                .path('/test/define/fluent')
                .action('test')
                .role("aaa")
                .validations({'userName': validator.string().required()});
        });

        it('should call define controller from  linq object', async () => {

            let res = await request(app.handle)
                .get('/test/hello')

            res.should.to.have.status(200);

            res.should.to.be.json;

            should.exist(res.body);

            res.body.test.should.be.eq("hello");

            res.body.name.should.be.eq('HelloController')

        });

        it('should  call define controller from linq', async () => {

            let res = await request(app.handle)
                .get('/test/define/linq/?userName=11');

            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.working.should.be.ok;

            res.body.controllerName.should.be.eq('defineController');

            res.body.model.userName.should.ok;
        });

        it('should  call define controller from  fluent method', async () => {

            let res = await request(app.handle)
                .get('/test/define/fluent_method/?userName=11');


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.working.should.be.ok;

            res.body.controllerName.should.be.eq('defineController');

            res.body.model.userName.should.ok;
        });

        it('should  call controller from linq fluent', async () => {

            let res = await request(app.handle)
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
            app.route<EnvController>(EnvController)
                .path("/test/env/not_in_env/")
                .action(c => c.test)
                .environment("test");


            app.route<EnvController>(EnvController)
                .path("/test/env/")
                .action(c => c.test)
                .environment("testing");
        })

        it('should not call route with env if not in environments', async () => {

            let res = await request(app.handle)
                .get('/test/env/not_in_env/');


            res.should.to.have.status(404);
        });


        it('should call route with env', async () => {

            let res = await request(app.handle)
                .get('/test/env/');


            res.should.to.have.status(200);
        });
    });

    describe('gzip', function () {
        it('should  call call controller with gzip', async () => {

            let res = await request(app.handle)
                .get('/test/gzip/')


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body)
            res.header["content-encoding"].should.be.eq("gzip")

            res.body.working.should.be.ok;
        });

        it('should  call call controller with compression', async () => {

            let res = await request(app.handle)
                .get('/test/compression/')


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body)

            res.body.working.should.be.ok;
            res.header["content-encoding"].should.be.eq("gzip")

        });
    });

    describe('middleware', function () {
        beforeEach(() => {
            app.route<MiddlewareController>(MiddlewareController)
                .path('/test/middleware/function')
                .method(Methods.GET)
                .action('fn')
                .middleware(function (req, res, next) {
                    (req as any).working = true
                    next()
                });

            app.route<MiddlewareController>(MiddlewareController)
                .path('/test/middleware/objectId')
                .method(Methods.GET)
                .action('test')
                .middleware('testMiddleware');


            app.route<MiddlewareController>(MiddlewareController)
                .path('/test/middleware/class')
                .method(Methods.GET)
                .action('test')
                .middleware(TestMiddleware);

            app.route<MiddlewareController>(MiddlewareController)
                .path('/test/middleware/auth')
                .method(Methods.GET)
                .action('test')
                .middleware(AuthMiddleware);
        })

        it('should  call middleware with function before controller', async () => {


            let res = await request(app.handle)
                .get('/test/middleware/function');


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body)

            res.body.working.should.be.ok;
        });


        it('should  call auth middleware before controller', async () => {

            let res = await request(app.handle)
                .get('/test/middleware/auth/');


            res.should.to.have.status(403);

            should.exist(res.text)

            res.text.should.be.eq('{"status":403,"statusText":"Unauthorized","error":"NOT AUTHORIZED","code":11}')

        });

        it('should  call middleware before controller with class', async () => {

            let res = await request(app.handle)
                .get('/test/middleware/class')


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.working.should.be.ok;

            res.body.middleware.should.be.ok;
            res.body.name.should.be.eq("Manager")
        });

        it('should  call middleware by order', async () => {

            let res = await request(app.handle)
                .get('/test/middleware/order')


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.working.should.be.eq("working1working2");

        });


        it('should  call middleware before controller with objectId', async () => {

            let res = await request(app.handle)
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


            let res = await request(app.handle)
                .get('/test/module/');

            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.logger.should.be.ok;

            res.body.logger.should.be.eq("testinglogger2testinglogger3");
        });
    });

    describe('params', function () {
        it('should  call controller from with params', async () => {

            let res = await request(app.handle)
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

            let res = await request(app.handle)
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
            let res = await request(app.handle)
                .get('/test.html')

            res.should.to.have.status(200);

            res.text.should.be.match(/aaa/)
            res.type.should.be.match(/text\/html/)
        })
    })


    describe('promise', function () {
        it('should should call promise', async () => {
            let res = await request(app.handle)
                .get('/test/promise')

            res.should.to.have.status(200);

            res.body.working.should.be.eq("working")

        })

        it('should should call promise with error', async () => {
            let res = await request(app.handle)
                .get('/test/promise/error')

            res.should.to.have.status(500);

            res.body.statusText.should.be.eq("Internal Server Error")

        })
    })

    describe('query', function () {
        it('should should have query params', async () => {
            let res = await request(app.handle)
                .get(`/test/query?test=1&test2[]=2&test2[]=3&test3[]=${encodeURIComponent("http://test.com")}`)

            res.should.to.have.status(200);

            res.body.test.should.be.eq("1")
            res.body.test2[1].should.be.eq("3")
            res.body.test3[0].should.be.eq("http://test.com")
        });

        it('should should have query params with #', async () => {
            let res = await request(app.handle)
                .get(`/test/query/?test=1&test2[]=2&test2[]=3&test3[]=${encodeURIComponent("http://test.com")}#aaa`)

            res.should.to.have.status(200);

            res.body.test.should.be.eq("1")
            res.body.test2[1].should.be.eq("3")
            res.body.test3[0].should.be.eq("http://test.com")
        });
    });

    describe('protocol', function () {
        it('should should have protocol on request', async () => {
            let res = await request(app.handle)
                .get(`/test/protocol`)

            res.should.to.have.status(200);

            res.body.host.should.be.includes("127.0.0.1");
            res.body.protocol.should.be.eq("http");
            res.body.secure.should.be.eq(false)
        });

        it('should should have protocol on request with proxy', async () => {
            let res = await request(app.handle)
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

            const agent = request.agent(app.handle);


            let res = await agent
                .get(`/test/cookie/?aa=bb`)

            res.should.to.have.status(200);
            res.header["set-cookie"][0].should.be.eq("cookie=hey; Path=/; Expires=Mon, 01 Feb 2100 00:00:00 GMT");

            let res2 = await agent
                .get(`/test/cookie/?aa=bb`)

            res2.body.cookie.should.be.eq("hey")
        })

        it('should should have cookie json', async () => {

            const agent = request.agent(app.handle);


            let res = await agent
                .get(`/test/cookie_json/?aa=bb`)

            res.should.to.have.status(200);
            res.header["set-cookie"][0].should.be.eq("cookie=j%3A%7B%22test%22%3A%22working%22%7D; Path=/; Expires=Mon, 01 Feb 2100 00:00:00 GMT");

            let res2 = await agent
                .get(`/test/cookie_json/?aa=bb`)

            res2.body.cookie.test.should.be.eq("working")
        })

        it('should should clear cookie', async () => {

            const agent = request.agent(app.handle);


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
            let res = await request(app.handle)
                .get('/test/redirect/').redirects(2)

            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.name.should.be.eq("redirectTo")
        })
    })

    describe('root', function () {
        xit('should should call route *', async () => {

            let res = await request(app.handle)
                .get('/test222/')

            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.name.should.be.eq("all")

        });

        it('should should call route /', async () => {

            let res = await request(app.handle)
                .get('/');

            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.name.should.be.eq("root")

        });

        it('should should call route with end', async () => {

            let res = await request(app.handle)
                .get('/raw');

            res.should.to.have.status(200);

            should.exist(res.body);

            res.text.should.be.eq("raw")

        });

        it('should should call with route not found', async () => {

            let res = await request(app.handle)
                .get('/test/route2222/?user2_name=11');

            res.should.to.have.status(404);

            should.exist(res.text);

            res.text.should.contain("/test/route2222/")
        });
    });
    describe('decorator route controller', function () {
        it('should call decorator route controller ', async () => {
            let res = await request(app.handle)
                .get(`/test/decorator/route/aaa/bbb?test=${encodeURIComponent("http://www.cnn.com")}`);


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.model.test.should.be.eq("http://www.cnn.com");
            res.body.model.name.should.be.eq("aaa");
        });

        it('should call decorator2 route controller ', async () => {
            let res = await request(app.handle)
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
            let res = await request(app.handle)
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

            let res = await request(app.handle)
                .get('/test/static/controller/aaa/bbb/?userName=11');

            let res2 = await request(app.handle)
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

            let res = await request(app.handle)
                .get(`/test/static/controller/aaa/bbb?test=${encodeURIComponent("http://www.cnn.com")}`);


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.model.test.should.be.eq("http://www.cnn.com");
            res.body.model.name.should.be.eq("aaa");
        });

        it('should call static post controller ', async () => {

            let res = await request(app.handle)
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
        it('should should call with validation error', async () => {

            let res = await request(app.handle)
                .get('/test/validations/?user2_name=11');

            res.should.to.have.status(400);

            res.should.to.be.json;

            should.exist(res.body);

            res.body.error.should.contain("ValidationError: child \"userName\"");
            res.body.statusText.should.contain("Bad Request")
        });

        it('should call validations error', async () => {

            let res = await request(app.handle)
                .get('/test/validations/');


            res.should.to.have.status(400);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.error.should.be.ok;
        });

        it('should call validations with camelCase', async () => {

            let res = await request(app.handle)
                .get('/test/validations/?userName=test');


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.model.userName.should.be.ok;
        });


        it('should call validations ', async () => {

            let res = await request(app.handle)
                .get('/test/validations/auth/?username=aaa&password=1111');


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.username.should.be.ok;
        });

        it('should call validations param', async () => {

            let res = await request(app.handle)
                .get('/test/validations/param?test=aaa&test2=2');


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.test.should.be.eq("aaa");
            res.body.name.should.be.eq("ValidationParamController");
        });

        it('should call validations param inherit', async () => {

            let res = await request(app.handle)
                .get('/test/validations/param2?test=aaa&test2=2&id=www');


            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.test.should.be.eq("aaa");
            res.body.id.should.be.eq("www");
            res.body.name.should.be.eq("ValidationParamController");
        });

    });

    describe('json', function () {
        it('should should call route and get json', async () => {

            let res = await request(app.handle)
                .get('/test/json/?aaa=bbb&ccc=ddd');

            res.should.to.have.status(200);
            res.should.to.be.json;

            should.exist(res.body);

            res.body.query.should.be.ok;
            res.body.query.aaa.should.be.eq("bbb");
            res.body.query.ccc.should.be.eq("ddd");

        });

        it('should should call route and get json', async () => {

            let res = await request(app.handle)
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

            let res = await request(app.handle)
                .options('/test/params/aaa/bbb/?userName=11');

            res.should.to.have.status(204);
            res.header["access-control-allow-origin"].should.be.eq('*');
            res.header["content-length"].should.be.eq('0');

            res.text.should.be.eq("")
        });

        it('should call controller Head', async () => {

            let res = await request(app.handle)
                .head('/test/params/aaa/bbb/?userName=11');

            res.should.to.have.status(200);
            res.header["access-control-allow-origin"].should.be.eq('*');
            res.header["content-length"].should.be.eq('126');
            res.header["content-type"].should.be.eq('application/json; charset=utf-8');

            should.not.exist(res.text);
        });


        it('should call controller empty response', async () => {

            let res = await request(app.handle)
                .get('/test/params/empty/aaa/bbb/?userName=11');

            res.should.to.have.status(204);
            res.header["access-control-allow-origin"].should.be.eq('*');
            res.header["content-length"].should.be.eq('0');
            should.not.exist(res.header["content-type"]);

            res.text.should.be.eq("");
        });


    })

    describe('render', function () {
        it('should render view', async () => {

            let res = await request(app.handle)
                .get('/test/view?test=11');

            res.should.to.have.status(200);
            res.header["access-control-allow-origin"].should.be.eq('*');
            res.header["content-type"].should.be.eq('text/html;charset=utf-8');

            res.text.should.be.eq("hello 11");
        });

        it('should render view', async () => {

            let res = await request(app.handle)
                .get('/test/view2?test=11');

            res.should.to.have.status(200);
            res.header["access-control-allow-origin"].should.be.eq('*');
            res.header["content-type"].should.be.eq('text/html;charset=utf-8');

            res.text.should.be.eq("hello2 11");
        });
    });

    describe('abstract', function () {
        it('should have abstract route with middleware', async () => {

            let res = await request(app.handle)
                .get('/test/abstract?test=11');

            res.should.to.have.status(200);

            res.body.working.should.be.eq("working1working2working3");
        });

        it('should have abstract route with diff base', async () => {

            let res = await request(app.handle)
                .get('/test2/abstract?test=11');

            res.should.to.have.status(200);

            res.body.working.should.be.eq("working1working2working3fromTest2");
        });

        // it('should have abstract inherit route', async () => {
        //
        //     let res = await request(app.handle)
        //         .get('/test/abstract?test=11');
        //
        //     res.should.to.have.status(200);
        //
        //     res.body.working.should.be.eq(":working1working2working31");
        // });

    });

});


// import Benchmark = require('benchmark');
//
// let suite = new Benchmark.Suite;
// suite.
// add('vanilla', function() {
//     new Test(11).getName()
// }).add('fast', function() {
//     (new Test(22) as any).getName2()
// }).on('cycle', function(event) {
//     console.log(String(event.target));
// }).run();