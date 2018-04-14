"use strict";
import {Controller, controller, IRequest, IResponse, get, validation, validator} from '../../../../index';

@controller()
export class ValidationController extends Controller {

    @get("/test/validations/")
    @validation("userName", validator.string().required())
    test(req: IRequest, res: IResponse) {
        res.json({working: true, controllerName: this.route.controller, model: req.model})
    }

    @get("/test/validations/auth")
    @validation({
        username: validator.string().alphanum().min(3).max(30).required(),
        password: validator.string().alphanum().min(3).max(30).required()
    })
    validaion(req: IRequest, res: IResponse) {
        res.json(req.model)
    }

}



