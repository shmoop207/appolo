"use strict";
import {controller,get,StaticController,IRequest,IResponse} from '@appolo/route';
import { inject,define,singleton,override,lazy} from '@appolo/inject';

@controller()
export class RedirectController extends StaticController {

    @get("/test/redirect")
    redirect(req:IRequest, res:IResponse) {
        res.redirect("/test/redirectTo");
    }
    @get("/test/redirectTo")
    redirectTo(req, res,model,route) {
        res.json({name: route.actionName})
    }
}
