"use strict";
import {controller, inject, Controller, get, hook} from '../../../../index';
import {Hooks} from "appolo-agent/lib/types";

@controller()
export class HooksController extends Controller {
    @inject() manager: any;

    @get("/test/hooks")
    @hook(Hooks.PreMiddleware, function (req,res,next) {
        req.model = {...req.model, a:11};

        next();
    })
    hooks(req, res) {
        return {query: req.model}
    }


}
