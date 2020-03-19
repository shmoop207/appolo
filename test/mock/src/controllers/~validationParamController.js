"use strict";
// "use strict";
// import {
//     controller,
//     Controller,
//     get,
//     IRequest,
//     IResponse,
//     middleware,
//     post,
//
// } from '../../../../index';
// import {RouteModel} from "../../../../lib/routes/routeModel";
//
//
// class ValidationModel extends RouteModel {
//     @validationParam(validator.string().required())
//     test: string;
//
//     @validationParam(validator.number().required())
//     test2: number
// }
//
// class Validation2Model extends ValidationModel {
//     @validationParam(validator.string().required())
//     id: string;
// }
//
// @controller()
// export class ValidationParamController extends Controller {
//
//     @get('/test/validations/param')
//     @validation(ValidationModel)
//     public validation(req: IRequest, res: IResponse) {
//
//         let model = this.getModel<ValidationModel>();
//
//         res.json({test: model.test, name: this.constructor.name})
//     }
//
//     @get('/test/validations/param2')
//     @validation(Validation2Model)
//     public validation2(req: IRequest, res: IResponse, model: Validation2Model, route) {
//
//
//         res.json({test: model.test, id: model.id, name: this.constructor.name})
//     }
//
//     @post('/test/validations/param2')
//     @validation(Validation2Model)
//     @middleware((function (req, res, next) {
//         req.model.working = "true"
//         next()
//     }))
//     public validation3(req: IRequest, res: IResponse, model: Validation2Model, route) {
//
//
//         res.json({test: model.test, id: model.id, name: this.constructor.name, working: req.model.working})
//     }
// }
//
//
//# sourceMappingURL=~validationParamController.js.map