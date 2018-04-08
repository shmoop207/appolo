"use strict";
import {
    abstract,
    define,
    inject,
    injectParam,
    IRequest,
    IResponse,
    lazy,
    path,
    singleton,
    StaticController,
    validation,
    validator
} from '../../../../index';
import {Manager} from "../manager/manager";
import {UserMiddleware} from "../middleware/userMiddleware";

@define()
@singleton()
@lazy()
export class DecoratorParamsController extends StaticController {

    private name: string;

    constructor(@injectParam() manager: Manager) {
        super();

        this.name = manager.name
    }

    //@inject() manager: any;

    @path("/test/decorator/param/:name/:name2")
    @validation("name2", validator.string())
    @validation("name", validator.string())
    @abstract({middleware: [UserMiddleware]})
    public test(req: IRequest, res: IResponse, route, aaa, @injectParam() env: any) {


        this.sendOk(res, {model: env.test, name: this.name, user: (req as any).user})
    }


}






