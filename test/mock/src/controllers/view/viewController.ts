"use strict";
import {controller, inject, IResponse, pathGet, StaticController} from '../../../../../index';

@controller()
export class ViewController extends StaticController {


    @pathGet("/test/view")
    async raw(req, res: IResponse, route) {

        await res.render({test: req.query.test})

    }

    @pathGet("/test/view2")
    async view2(req, res: IResponse, route) {

        await res.render("raw2", {test: req.query.test})


    }

}


