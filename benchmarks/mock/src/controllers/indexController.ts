"use strict";
import {controller, get, IRequest, IResponse, singleton, StaticController} from '../../../../index';


@controller()
@singleton()
export class IndexController extends StaticController {

    @get("/test/")
    public hello(req: IRequest, res: IResponse) {
        res.send('hello world')
    }
}






