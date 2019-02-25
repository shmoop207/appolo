"use strict";
import {controller, Controller, get, HttpError, inject,error} from '../../../../index';
import {ErrorMiddleware} from "../middleware/errorMiddleware";


@controller()
export class ErrorController extends Controller {
    @inject() manager: any;

    @get('/test/error')
    @error(function (err:HttpError,req,res,next) {
        err.message = err.message+"aaaa"
        next(err);
    })
    @error(ErrorMiddleware)
    async error(req, res) {

        throw new HttpError(500, "error")
    }


    @get('/test/error2')
    @error(function (err:HttpError,req,res,next) {
        err.message = err.message+"aaaa"
        next(err);
    })
    async error2(req, res) {

        throw new HttpError(500, "error")
    }

}
