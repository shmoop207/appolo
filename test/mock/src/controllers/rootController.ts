"use strict";
import {controller, inject,get,StaticController} from '../../../../index'
import {} from '../../../../decorators';

@controller()
export class RootController extends StaticController {

    all(req, res,route) {
        res.json({name: route.actionName})
    }
    @get("/")
    root(req, res,model,route) {
        res.json({name: route.actionName})
    }
    @get("/raw")
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
