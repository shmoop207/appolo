"use strict";
import {controller, inject, Controller, get, post} from '../../../../index';

@controller()
export class HooksController extends Controller {
    @inject() manager: any;

    @get("/test/hooks")
    hooks(req, res) {
        return {query: req.model}
    }


}
