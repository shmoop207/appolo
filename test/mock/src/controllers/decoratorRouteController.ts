"use strict";
import {
    controller,
    StaticController,
    get,
    IRequest,
    IResponse,
} from '@appolo/route';

import { inject,define,singleton,override,lazy} from '@appolo/inject';


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






