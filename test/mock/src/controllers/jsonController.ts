"use strict";
import {controller, Controller, get, post} from '@appolo/route';
import { inject,define,singleton,override,lazy,injectParam} from '@appolo/inject';

@controller()
export class JsonController extends Controller {
    @inject() manager: any;

    @get("/test/json")
    json(req, res) {
        res.gzip().json({query: req.query})
    }

    @post("/test/json")
    jsonPost(req, res) {
        res.gzip().json({body: req.body})
    }

}
