"use strict";
import {define, inject, IResponse, pathGet, StaticController} from '../../../../../index';

@define()
export class ViewController extends StaticController {


    @pathGet("/test/view")
    async raw(req, res: IResponse, route) {

        res.render({test: req.query.test})

    }

    @pathGet("/test/view2")
    async view2(req, res: IResponse, route) {

        res.render("raw2", {test: req.query.test})


    }

}


