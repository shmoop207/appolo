"use strict";
import {controller, Controller, get, hook,Hooks} from '@appolo/route';
import { inject} from '@appolo/inject';


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
