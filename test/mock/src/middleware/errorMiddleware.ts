"use strict";
import { Middleware} from '@appolo/route';
import {Manager} from "../manager/manager";
import { inject,define,singleton,override,lazy} from '@appolo/inject';


@define()
export class ErrorMiddleware extends Middleware {


    catch(err,req, res, next) {

        res.status(503);

       res.json({data:err.message})
    }
}
