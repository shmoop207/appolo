"use strict";

import {IRouteOptions} from "../interfaces/IRouteOptions";
import {IMiddleware} from "../interfaces/IMiddleware";
import {HttpError, IRequest, IResponse, NextFn} from "appolo-agent";
import {BadRequestError, InternalServerError, NotFoundError, UnauthorizedError} from "appolo-agent/index";


export abstract class StaticMiddleware implements IMiddleware {


    public getModel<T>(req?: IRequest): T {
        return (req).model as T;
    }

    public abstract run(req: IRequest, res: IResponse, next: NextFn, route: IRouteOptions): void

    public sendError(next: NextFn, error?: Error, code?: number): void {

        this._callNext(next, new InternalServerError(error, {}, code));
    }

    public sendBadRequest(next: NextFn, error?: Error, code?: number,data?:any) {

        this._callNext(next, new BadRequestError(error, data, code));
    }

    public sendUnauthorized(next: NextFn, error?: Error, code?: number,data?:any) {

        this._callNext(next, new UnauthorizedError(error, data, code));

    }

    public sendNotFound(next: NextFn, error?: Error, code?: number,data?:any) {

        this._callNext(next, new NotFoundError(error, data, code));
    }

    protected _callNext(next: NextFn, e: HttpError) {


        next(e);
    }
}
