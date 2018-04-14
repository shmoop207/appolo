"use strict";
import {controller, inject,pathGet,StaticController,IRequest,IResponse} from '../../../../index';

@controller()
export class RedirectController extends StaticController {

    @pathGet("/test/redirect")
    redirect(req:IRequest, res:IResponse) {
        res.redirect("/test/redirectTo");
    }
    @pathGet("/test/redirectTo")
    redirectTo(req, res,model,route) {
        res.json({name: route.actionName})
    }
}