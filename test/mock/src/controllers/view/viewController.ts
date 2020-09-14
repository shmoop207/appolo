"use strict";
import {controller, IResponse, get, StaticController} from '@appolo/route';
import { inject,define,singleton,override,lazy,injectParam} from '@appolo/inject';

@controller()
export class ViewController extends StaticController {


    @get("/test/view")
    async raw(req, res: IResponse, route) {

        await res.render({test: req.query.test})

    }

    @get("/test/view2")
    async view2(req, res: IResponse, route) {

        await res.render("raw2", {test: req.query.test})


    }

}


