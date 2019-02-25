"use strict";
import {IRouteOptions} from "../interfaces/IRouteOptions";
import {BadRequestError, HttpError, InternalServerError, NextFn, NotFoundError, UnauthorizedError} from "appolo-agent";
import {IRequest} from "../interfaces/IRequest";
import {IResponse} from "../interfaces/IResponse";
import {IMiddleware} from "../interfaces/IMiddleware";


export abstract class Middleware implements IMiddleware{

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

    public  run(req: IRequest, res: IResponse, next: NextFn, route: IRouteOptions): void{
        next();
    }

    public  catch(err,req: IRequest, res: IResponse, next: NextFn, route: IRouteOptions): void{
        next(err);
    }

    public sendError(error?: Error | string, code?: number): void {

        this._callNext(new InternalServerError(error, {}, code));
    }

    public sendBadRequest(error?: Error | string, code?: number) {

        this._callNext(new BadRequestError(error, {}, code));
    }

    public sendUnauthorized(error?: Error | string, code?: number) {

        this._callNext(new UnauthorizedError(error, {}, code));

    }

    public sendNotFound(error?: Error | string, code?: number) {

        this._callNext(new NotFoundError(error, {}, code));
    }

    protected _callNext(e: HttpError) {


        this.next(e);
    }

}
