"use strict";
import {
    controller,


    get,
    post,

    StaticController,
} from '@appolo/route';
import { inject,define,singleton,override,lazy} from '@appolo/inject';

@controller()
@singleton()
@lazy()
export class StaticController2 extends StaticController {
    @inject() manager: any;

    @post("/test/static/controller/:name/:bbb/post")
       test(req, res) {
        res.json({model: this.getModel(req)})
    }

    @get("/test/static/controller/:name/:name2")
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



