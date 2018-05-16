"use strict";
import {IRouteOptions} from "../interfaces/IRouteOptions";
import {IRequest, IResponse} from "appolo-agent";
import {IController} from "./IController";
import {BadRequestError, InternalServerError, NotFoundError, UnauthorizedError} from "appolo-agent/index";

export abstract class Controller implements IController {

    protected req: IRequest;
    protected res: IResponse;
    protected route: IRouteOptions;
    protected action: string | Function;

    protected constructor(req: IRequest, res: IResponse, route: IRouteOptions) {

        this.req = req;
        this.res = res;
        this.route = route;
    }

    public send(statusCode?: number, data?: any) {

        if (arguments.length === 1) {
            this.sendOk(arguments[0])
        } else {
            this.res.status(statusCode).json(data);
        }
    }

    public sendOk(data?: any) {
        this.res.status(200).json(data);
    }

    public sendCreated(data?: any) {
        this.res.status(201).send(data);
    }

    public sendNoContent() {
        this.res.status(204).send();
    }

    public sendError(res: IResponse, error?: Error, code?: number, data?: any) {

        throw new InternalServerError(error, data, code)
    }

    public sendBadRequest(res: IResponse, error?: Error, code?: number, data?: any) {
        throw new BadRequestError(error, data, code)
    }

    public sendUnauthorized(res: IResponse, error?: Error, code?: number, data?: any) {
        throw new UnauthorizedError(error, data, code)
    }

    public sendNotFound(res: IResponse, error?: Error, code?: number, data?: any) {
        throw new NotFoundError(error, data, code)
    }

    public getModel<T>(): T {
        return (this.req as any).model;
    }
}
