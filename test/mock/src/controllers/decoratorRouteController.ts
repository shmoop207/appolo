"use strict";
import {
    controller,
    define,
    singleton,
    lazy,
    StaticController,
    inject,
    get,
    IRequest,
    IResponse, pipelineType, IPipeline, PipelineContext, App, injectParam, Util, Controller
} from '../../../../index';



@controller()
@singleton()
@lazy()
export class DecoratorRouteController extends StaticController {

    @inject() manager: any;

    @get("/test/decorator/route/:name/:name2")
    public test(req: IRequest, res: IResponse) {
        res.json({model: this.getModel(req)})
    }


    @get("/test/decorator2/route/:name/:name2")
    public test2(req: IRequest, res: IResponse) {
        res.json({model: this.getModel(req)})
    }

}






