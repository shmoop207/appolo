"use strict";
import {body, Controller, controller, customRouteDecorator, inject, post,headers} from '../../../../index';

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
