"use strict";
import {define, inject,pathGet,StaticController} from '../../../../index'
import {} from '../../../../decorators';

@define()
export class RootController extends StaticController {

    all(req, res,route) {
        res.json({name: route.actionName})
    }
    @pathGet("/")
    root(req, res,route) {
        res.json({name: route.actionName})
    }
    @pathGet("/raw")
    raw(req, res,route) {
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
