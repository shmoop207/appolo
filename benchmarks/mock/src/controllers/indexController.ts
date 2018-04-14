"use strict";
import {controller, IRequest, IResponse, pathGet, singleton, StaticController} from '../../../../index';


@controller()
@singleton()
export class IndexController extends StaticController {

    @pathGet("/test/")
    public hello(req: IRequest, res: IResponse) {
        res.send('hello world')
    }
}






