"use strict";
import {
    define,
    Controller,
    IResponse,
    IRequest,
    pathGet,
} from '../../../../index';


@define()
export class HelloController extends Controller {

    @pathGet('/test/hello')
    public hello(req: IRequest, res: IResponse) {


        res.json({test: "hello", name: this.constructor.name})
    }


}


