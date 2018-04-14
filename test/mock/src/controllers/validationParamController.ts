"use strict";
import {
    controller,
    Controller,
    IRequest,
    IResponse,
    pathGet,
    validation,
    validationParam,
    validator
} from '../../../../index';
import {RouteModel} from "../../../../lib/routes/routeModel";


class ValidationModel extends RouteModel {
    @validationParam(validator.string().required())
    test: string;

    @validationParam(validator.number().required())
    test2: number
}

class Validation2Model extends ValidationModel {
    @validationParam(validator.string().required())
    id: string;
}

@controller()
export class ValidationParamController extends Controller {

    @pathGet('/test/validations/param')
    @validation(ValidationModel)
    public validation(req: IRequest, res: IResponse) {

        let model = this.getModel<ValidationModel>();

        res.json({test: model.test, name: this.constructor.name})
    }

    @pathGet('/test/validations/param2')
    @validation(Validation2Model)
    public validation2(req: IRequest, res: IResponse, model: Validation2Model, route) {


        res.json({test: model.test, id: model.id, name: this.constructor.name})
    }
}


