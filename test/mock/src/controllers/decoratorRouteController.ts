"use strict";
import {
    controller,
    define,
    singleton,
    lazy,
    StaticController,
    inject,
    get,
    validation,
    validator,
    IRequest,
    IResponse
} from '../../../../index';

@controller()
@singleton()
@lazy()
export class DecoratorRouteController extends StaticController {

    @inject() manager: any;

    @get("/test/decorator/route/:name/:name2")
    @validation("name2", validator.string())
    @validation("name", validator.string())
    @validation("test", validator.string())
    public test(req: IRequest, res: IResponse) {
        res.json({model: this.getModel(req)})
    }


    @get("/test/decorator2/route/:name/:name2")
    @validation("name2", validator.string())
    @validation("name", validator.string())
    @validation("test", validator.string())
    public test2(req: IRequest, res: IResponse) {
        res.json({model: this.getModel(req)})
    }

}






