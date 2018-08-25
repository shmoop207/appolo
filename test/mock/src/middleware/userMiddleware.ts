"use strict";
import {define, inject, singleton, lazy, Middleware, Context} from '../../../../index';
import {Manager} from "../manager/manager";


@define()
export class UserMiddleware extends Middleware {
    @inject() context: Context;


    run(req, res, next) {
        req.user = "user";
        this.context.set("user",req.query.userName);
        next()
    }
}
