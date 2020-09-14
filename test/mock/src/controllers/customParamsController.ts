"use strict";
import {body, Controller, controller, customRouteDecorator, post,headers} from '@appolo/route';
import { inject,define,singleton,override} from '@appolo/inject';

let someHeader = customRouteDecorator((req, res, route) => {
    res.setHeader("x-test2", "222")
})

@controller()
export class CustomParamsController extends Controller {
    @inject() manager: any;

    @post('/test/custom/params')
    test(@body("test") test,@headers("user-agent") userAgent) {
        return {working: test,userAgent}
    }

}
