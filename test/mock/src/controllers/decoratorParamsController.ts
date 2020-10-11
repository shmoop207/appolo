"use strict";
import {
    abstract,
    IRequest,
    IResponse,
    get,
    StaticController,
    controller
} from '@appolo/route';
import {Manager} from "../manager/manager";
import {UserMiddleware} from "../middleware/userMiddleware";
import { inject,define,singleton,override,lazy} from '@appolo/inject';

@controller()
@singleton()
@lazy()
export class DecoratorParamsController extends StaticController {

    private name: string;

    constructor(@inject() manager: Manager) {
        super();

        this.name = manager.name
    }

    //@inject() manager: any;

    @get("/test/decorator/param/:name/:name2")
    @abstract({middleware: [UserMiddleware]})
    public test(req: IRequest, res: IResponse, route, aaa, @inject() env: any) {


        this.sendOk(res, {model: env.test, name: this.name, user: (req as any).user})
    }


}






