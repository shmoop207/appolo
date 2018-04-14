"use strict";
import {
    controller,
    define,
    singleton,
    lazy,
    StaticController,
    inject,
    path,
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

    @path("/test/decorator/route/:name/:name2")
    @validation("name2", validator.string())
    @validation("name", validator.string())
    @validation("test", validator.string())
    public test(req: IRequest, res: IResponse) {
        res.json({model: this.getModel(req)})
    }


    @path("/test/decorator2/route/:name/:name2")
    @validation("name2", validator.string())
    @validation("name", validator.string())
    @validation("test", validator.string())
    public test2(req: IRequest, res: IResponse) {
        res.json({model: this.getModel(req)})
    }

}






