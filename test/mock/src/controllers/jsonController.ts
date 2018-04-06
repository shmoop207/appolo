"use strict";
import {define, inject, Controller, pathGet, pathPost} from '../../../../index';

@define()
export class JsonController extends Controller {
    @inject() manager: any;

    @pathGet("/test/json")
    json(req, res) {
        res.gzip().json({query: req.query})
    }

    @pathPost("/test/json")
    jsonPost(req, res) {
        res.gzip().json({body: req.body})
    }

}
