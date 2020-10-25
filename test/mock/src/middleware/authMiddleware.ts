"use strict";
import {StaticMiddleware,IRequest,IResponse,NextFn,HttpError,next} from '@appolo/route';
import {Manager} from "../manager/manager";
import { inject,define,singleton,override,lazy} from '@appolo/inject';


@define()
@singleton()
@lazy()
export class AuthMiddleware extends StaticMiddleware {
    @inject() manager: Manager;

    public run(@next() next:NextFn) {

        this.sendUnauthorized(next,new HttpError(403,"NOT AUTHORIZED"),201);
    }
}
