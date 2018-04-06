"use strict";
import {IRouteOptions} from "../interfaces/IRouteOptions";
import {IRequest, IResponse} from "appolo-agent";
import {IController} from "./IController";

export abstract class Controller implements IController{

    protected req: IRequest;
    protected res: IResponse;
    protected route: IRouteOptions;
    protected action: string | Function;

    constructor(req: IRequest, res: IResponse, route: IRouteOptions) {

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

    public sendError(error?, code?) {
        this.res.status(500).json({
            status: 500,
            statusText: "Internal Server Error",
            error: error ? error.toString() : "",
            code: code
        });
    }

    public sendBadRequest(error?, code?) {
        this.res.status(400).json({
            status: 400,
            statusText: "Bad Request",
            error: (error instanceof Error) ? error.toString() : "",
            code: code
        });
    }

    public sendUnauthorized(error?, code?) {
        this.res.status(401).json({
            status: 401,
            statusText: "Unauthorized",
            error: error ? error.toString() : "",
            code: code
        });
    }

    public sendNotFound(error?, code?) {
        this.res.status(404).json({
            status: 404,
            statusText: "Not Found",
            error: error ? error.toString() : "",
            code: code
        });
    }

    public getModel<T>(): T {
        return (this.req as any).model;
    }
}
