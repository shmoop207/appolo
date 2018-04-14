"use strict";
import {
    controller,
    Controller,
    IResponse,
    IRequest,
    get,
} from '../../../../index';


@controller()
export class HelloController extends Controller {

    @get('/test/hello')
    public hello(req: IRequest, res: IResponse) {


        res.json({test: "hello", name: this.constructor.name})
    }


}


