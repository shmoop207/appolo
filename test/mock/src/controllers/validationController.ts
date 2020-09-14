"use strict";
import {Controller, controller, IRequest, IResponse, get} from '@appolo/route';

@controller()
export class ValidationController extends Controller {

    @get("/test/validations/")
    test(req: IRequest, res: IResponse) {
        res.json({working: true, controllerName: this.route.controller, model: req.query})
    }

    @get("/test/validations/auth")
    validaion(req: IRequest, res: IResponse) {
        res.json(req.query)
    }

}



