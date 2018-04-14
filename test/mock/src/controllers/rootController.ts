"use strict";
import {controller, inject,pathGet,StaticController} from '../../../../index'
import {} from '../../../../decorators';

@controller()
export class RootController extends StaticController {

    all(req, res,route) {
        res.json({name: route.actionName})
    }
    @pathGet("/")
    root(req, res,model,route) {
        res.json({name: route.actionName})
    }
    @pathGet("/raw")
    raw(req, res,model,route) {
        res.end(route.actionName)
    }

}


//
// appolo.route<RouteStaticController>(RouteStaticController)
//     .path("*")
//     .method("get")
//     .action(c => c.all)

// appolo.route<RootController>(RootController)
//     .path("/")
//     .method("get")
//     .action(c => c.root)
