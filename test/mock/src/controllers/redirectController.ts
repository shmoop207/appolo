"use strict";
import {define, inject,pathGet,StaticController,IRequest,IResponse} from '../../../../index';

@define()
export class RedirectController extends StaticController {

    @pathGet("/test/redirect")
    redirect(req:IRequest, res:IResponse) {
        res.redirect("/test/redirectTo");
    }
    @pathGet("/test/redirectTo")
    redirectTo(req, res,route) {
        res.json({name: route.actionName})
    }
}