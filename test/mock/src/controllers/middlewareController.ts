"use strict";
import {Controller, controller, middleware, get} from '@appolo/route';
import {TestMiddleware} from "../middleware/middleware";
import {AuthMiddleware} from "../middleware/authMiddleware";
import { inject,define,singleton,override,lazy,injectParam} from '@appolo/inject';

@controller()
export class MiddlewareController extends Controller {
    @inject() manager: any;

    test(req, res) {
        res.json({working: true})
    }

    fn(req, res) {
        res.json({working: req.working})
    }

    @get("/test/middleware/order")
    @middleware(function (req, res, next) {
        (req as any).working = "working1";
        next()
    })
    @middleware(function (req, res, next) {
        (req).working2 = req.working + "working2";
        next()
    })
    testOrderMiddleware(req, res) {
        res.json({working: req.working2})
    }


}



