"use strict";
import {  Middleware} from '@appolo/route';
import {Manager} from "../manager/manager";
import { inject,define,singleton,override} from '@appolo/inject';


@define()
export class UserMiddleware extends Middleware {


    run(req, res, next) {
        req.user = "user";
        next()
    }
}
