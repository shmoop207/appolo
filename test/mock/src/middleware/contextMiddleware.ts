"use strict";
import {  Middleware,context,IRequest,req,next} from '@appolo/route';
import {Manager} from "../manager/manager";
import { inject,define,singleton,override} from '@appolo/inject';


@define()
export class ContextMiddleware extends Middleware {

    public static for(context:{test?:number,test2?:number}){
        return super.for(context)
    }

    run(@context() context:{test:number,test2:number},@req() req:any,@next() next) {

       if(context.test){
           req.user = context.test;
       }
        if(context.test2){
            req.user += context.test2;
        }
        next()
    }
}
