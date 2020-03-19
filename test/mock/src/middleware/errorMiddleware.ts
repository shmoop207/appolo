"use strict";
import {define, inject, singleton, lazy, Middleware} from '../../../../index';
import {Manager} from "../manager/manager";


@define()
export class ErrorMiddleware extends Middleware {


    catch(err,req, res, next) {

        res.status(503);

       res.json({data:err.message})
    }
}
