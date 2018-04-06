"use strict";
import {define, inject, singleton, lazy,Middleware} from '../../../../index';
import {Manager} from "../manager/manager";


@define()
export class UserMiddleware extends Middleware {
    @inject() manager: Manager;

    run(req, res, next) {
        req.user = "user"
        next()
    }
}
