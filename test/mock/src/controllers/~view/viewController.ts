"use strict";
import appolo = require('../../../../../index');
import {define, inject, pathGet} from '../../../../../decorators';

@define()
export class ViewController extends appolo.StaticController {


    @pathGet("/test/view")
    async raw(req, res: appolo.IResponse, route) {

        res.render({test: req.query.test})

    }

    @pathGet("/test/view2")
    async view2(req, res: appolo.IResponse, route) {

        res.render("raw2", {test: req.query.test})


    }

}


