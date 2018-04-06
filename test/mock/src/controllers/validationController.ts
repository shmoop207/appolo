"use strict";
import {Controller, define, IRequest, IResponse, pathGet, validation, validator} from '../../../../index';

@define()
export class ValidationController extends Controller {

    @pathGet("/test/validations/")
    @validation("userName", validator.string().required())
    test(req: IRequest, res: IResponse) {
        res.json({working: true, controllerName: this.route.controller, model: req.model})
    }

    @pathGet("/test/validations/auth")
    @validation({
        username: validator.string().alphanum().min(3).max(30).required(),
        password: validator.string().alphanum().min(3).max(30).required()
    })
    validaion(req: IRequest, res: IResponse) {
        res.json(req.model)
    }

}



