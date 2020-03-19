// "use strict";
// import {
//     controller,
//     Controller,
//     get,
//     inject,
//     IRequest,
//     IResponse, middleware,
//     validation,
//     validator
// } from '../../../../index';
// import {Manager} from "../manager/manager";
// import {UserMiddleware} from "../middleware/userMiddleware";
//
// @controller()
// export class ContextController extends Controller {
//
//     @inject() manager: Manager;
//
//     @get("/test/context/")
//     @validation("userName", validator.string().required())
//     @middleware(UserMiddleware)
//     async test(req: IRequest, res: IResponse) {
//
//         let userName = await this.manager.getContextName()
//
//         res.json({userName})
//     }
//
//
// }
//
//
//
