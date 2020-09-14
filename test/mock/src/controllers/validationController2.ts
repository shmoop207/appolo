"use strict";
import {Controller, controller, IRequest, IResponse, get} from '@appolo/route';
import {ValidationController} from "./validationController";

@controller()
export class ValidationController2 extends ValidationController {

    @get("/test/nested/")
    test2(req: IRequest, res: IResponse) {

        return super.test(req, res)
    }

}



