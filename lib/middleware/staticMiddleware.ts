"use strict";

import {IRouteOptions} from "../interfaces/IRouteOptions";
import {IMiddleware} from "../interfaces/IMiddleware";
import {HttpError, IRequest, IResponse, NextFn} from "appolo-agent";


export abstract class StaticMiddleware implements IMiddleware {


    public getModel<T>(req?: IRequest): T {
        return (req).model as T;
    }

    public abstract run(req: IRequest, res: IResponse, next: NextFn, route: IRouteOptions): void

    public sendError(next: NextFn, error?: Error, code?: number): void {

        this._callNext(next, 500, "Internal Server Error", error, code);
    }

    public sendBadRequest(next: NextFn, error?: Error, code?: number) {

        this._callNext(next, 400, "Bad Request", error, code);
    }

    public sendUnauthorized(next: NextFn, error?: Error, code?: number) {

        this._callNext(next, 401, "Unauthorized", error, code);

    }

    public sendNotFound(next: NextFn, error?: Error, code?: number) {

        this._callNext(next, 404, "Not Found", error, code);
    }

    protected _callNext(next: NextFn, status: number, statusText: string, error: Error, code: number) {

        let err = new HttpError(status, statusText, error, {}, code)

        next(err);
    }
}
