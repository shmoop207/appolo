"use strict";
import {
    controller,
    Controller,
    IResponse,
    IRequest,
    pathGet,
} from '../../../../index';


@controller()
export class HelloController extends Controller {

    @pathGet('/test/hello')
    public hello(req: IRequest, res: IResponse) {


        res.json({test: "hello", name: this.constructor.name})
    }


}


