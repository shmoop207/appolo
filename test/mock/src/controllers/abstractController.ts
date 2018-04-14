"use strict";
import {Controller, controller, define, inject, middleware, path,singleton} from '../../../../index';

@middleware(function (req, res, next) {
    (req as any).working = "working1";
    next()
})
@middleware(function (req, res, next) {
    (req as any).working2 = "working2";
    next()
})
@define()
export class AbstractController extends Controller {
    @inject() manager: any;


    @middleware(function (req, res, next) {
        (req).working3 = req.working + req.working2 + "working3";
        next()
    })
    @path("abstract")
    test(req, res) {
        res.json({working: req.working3})
    }

}

@controller("test")
export class Abstract2Controller extends AbstractController {
    @inject() manager: any;

    test(req, res) {

        super.test(req, res)
    }
}

@controller("test2")
@singleton()
export class Abstract3Controller extends AbstractController {
    @inject() manager: any;

    test(req, res) {

        req.working3 += "fromTest2";

        super.test(req, res)
    }
}



