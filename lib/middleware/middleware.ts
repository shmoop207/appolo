"use strict";
import {IRouteOptions} from "../interfaces/IRouteOptions";
import {NextFn,HttpError,BadRequestError,UnauthorizedError,NotFoundError,InternalServerError} from "appolo-agent";
import {IRequest} from "../interfaces/IRequest";
import {IResponse} from "../interfaces/IResponse";


export abstract class Middleware {

    protected req: IRequest
    protected res: IResponse;
    protected next: NextFn;
    protected route: IRouteOptions;

    constructor(req: IRequest, res: IResponse, next: NextFn, route: IRouteOptions) {

        this.req = req;
        this.res = res;
        this.next = next;
        this.route = route;
    }

    public sendError(error?: Error|string, code?: number): void {

        this._callNext( new InternalServerError(error, {}, code));
    }

    public sendBadRequest(error?: Error|string, code?: number) {

        this._callNext(new BadRequestError(error, {}, code));
    }

    public sendUnauthorized(error?: Error|string, code?: number) {

        this._callNext(new UnauthorizedError(error, {}, code));

    }

    public sendNotFound(error?: Error|string, code?: number) {

        this._callNext( new NotFoundError(error, {}, code));
    }

    protected _callNext(e:HttpError) {



        this.next(e);
    }

}
