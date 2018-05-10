"use strict";
import {define, inject, singleton, lazy,StaticMiddleware,IRequest,IResponse,NextFn} from '../../../../index';
import {Manager} from "../manager/manager";
import {HttpError} from "appolo-agent";


@define()
@singleton()
@lazy()
export class AuthMiddleware extends StaticMiddleware {
    @inject() manager: Manager;

    public run(req:IRequest, res:IResponse, next:NextFn) {

        this.sendUnauthorized(next,new HttpError(403,"NOT AUTHORIZED"),201);
    }
}
