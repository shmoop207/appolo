"use strict";
import {StaticController, define, singleton, pathGet, IRequest, IResponse} from '../../../../index';


@define()
@singleton()
export class IndexController extends StaticController {

    @pathGet("/test/")
    public hello(req: IRequest, res: IResponse, route) {
        res.send('hello world')
    }
}






