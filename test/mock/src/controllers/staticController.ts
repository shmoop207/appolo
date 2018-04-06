"use strict";
import {
    define,
    inject,
    lazy,
    pathGet,
    pathPost,
    singleton,
    StaticController,
    validation,
    validator
} from '../../../../index';

@define()
@singleton()
@lazy()
export class StaticController2 extends StaticController {
    @inject() manager: any;

    @pathPost("/test/static/controller/:name/:bbb/post")
    @validation("test", validator.string())
    @validation("name", validator.string())
    @validation("userName", validator.string())
    @validation("name2", validator.string())
    @validation("name", validator.string())
    @validation("testPost", validator.boolean().required())
    test(req, res) {
        res.json({model: this.getModel(req)})
    }

    @pathGet("/test/static/controller/:name/:name2")
    @validation("test", validator.string())
    @validation("name", validator.string())
    @validation("userName", validator.string())
    @validation("name2", validator.string())
    @validation("name", validator.string())
    test2(req, res) {
        res.json({model: this.getModel(req)})
    }


}

// appolo.route<StaticController2>(StaticController2)
//     .path('/test/static/controller/:name/:name2')
//     .method('get')
//     .action('test')
//
//
// appolo.route<StaticController>(StaticController)
//     .path('/test/static/controller/:name/:bbb/post')
//     .method('post')
//     .action('test')
//     .validation("test", appolo.validator.string())
//     .validation("name", appolo.validator.string())
//     .validation("testPost", appolo.validator.boolean().required());



