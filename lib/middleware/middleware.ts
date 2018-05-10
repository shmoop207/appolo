"use strict";
import {IRouteOptions} from "../interfaces/IRouteOptions";
import {IRequest, IResponse, NextFn,HttpError} from "appolo-agent";


export abstract class Middleware {

    protected req: IRequest;
    protected res: IResponse;
    protected next: NextFn;
    protected route: IRouteOptions;

    constructor(req: IRequest, res: IResponse, next: NextFn, route: IRouteOptions) {

        this.req = req;
        this.res = res;
        this.next = next;
        this.route = route;
    }

    public sendError(error?: Error, code?: number): void {

        this._callNext(500, "Internal Server Error", error, code);
    }

    public sendBadRequest(error?: Error, code?: number) {

        this._callNext(400, "Bad Request", error, code);
    }

    public sendUnauthorized(error?: Error, code?: number) {

        this._callNext(403, "Unauthorized", error, code);

    }

    public sendNotFound(error?: Error, code?: number) {

        this._callNext(404, "Not Found", error, code);
    }

    protected _callNext(status: number, statusText: string, error: Error, code: number) {

        let err = new HttpError(status,statusText,error,{},code)

        this.next(err);
    }

}
