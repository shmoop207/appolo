"use strict";
import {Controller, controller, get, middleware} from '@appolo/route';
import { inject,define,singleton,override} from '@appolo/inject';

@middleware(function (req, res, next) {
    (req as any).working = "working1";
    next()
})
@middleware(function (req, res, next) {
    (req as any).working2 = "working2";
    next()
})
export class AbstractController extends Controller {
    @inject() manager: any;


    @middleware(function (req, res, next) {
        (req).working3 = req.working + req.working2 + "working3";
        next()
    })
    @get("abstract")
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

@middleware(function (req, res, a) {
    (req as any).working += "working1";
    a()
})
export class BaseController extends Controller {
    @get("/child_controller")
    @middleware(function (req, res, d) {
        (req as any).working+= "working4";
        d()
    })
    test(req,res) {
        res.json({working: req.working})
    }
}
@controller()
@singleton()
@middleware(function (req, res, b) {
    (req as any).working+= "working2";
    b()
})
@middleware(function (req, res, c) {
    (req as any).working+= "working3";
    c()
})
export class ChildController extends BaseController {

    @middleware(function (req, res, e) {
        (req as any).working+= "working5";
        e()
    })
    test(req,res) {
        super.test(req,res)
    }
}

