"use strict";
import {controller, inject,get,StaticController,IRequest,IResponse} from '../../../../index';

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