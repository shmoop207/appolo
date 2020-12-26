"use strict";
import {  Middleware,context,IRequest,req,next} from '@appolo/route';
import {Manager} from "../manager/manager";
import { inject,define,singleton,override} from '@appolo/inject';


@define()
export class ContextMiddleware extends Middleware {

    public static for(context:{test:number}){
        return super.for(context)
    }

    run(@context() context:any,@req() req:any,@next() next) {
        req.user = context;
        next()
    }
}
