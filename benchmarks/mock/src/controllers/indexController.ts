"use strict";
import {controller, get, IRequest, IResponse,  StaticController} from '@appolo/route';
import {singleton} from "@appolo/inject"

@controller()
@singleton()
export class IndexController extends StaticController {

    @get("/test/")
    public hello(req: IRequest, res: IResponse) {
        res.send('hello world')
    }
}






