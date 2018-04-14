"use strict";
import {controller, inject, Controller, get, post} from '../../../../index';

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
