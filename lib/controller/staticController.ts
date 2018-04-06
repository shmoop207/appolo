"use strict";
import {IRequest,IResponse} from "appolo-agent";
import {IController} from "./IController";

export abstract class StaticController implements IController{

    public send(res: IResponse, statusCode?: number, data?: any) {

        if (arguments.length === 1) {
            this.sendOk(arguments[0])
        } else {
            res.status(statusCode).json(data);
        }
    }

    public sendOk(res: IResponse, data?: any) {
        res.status(200).json(data);
    }

    public  sendCreated(res: IResponse, data?: any) {
        res.status(201).send(data);
    }

    public  sendNoContent(res: IResponse) {
        res.status(204).send();
    }

    public  sendError(res: IResponse, error?, code?) {
        res.status(500).json({
            status: 500,
            statusText: "Internal Server Error",
            error: error ? error.toString() : "",
            code: code
        });
    }

    public  sendBadRequest(res: IResponse, error?, code?) {
        res.status(400).json({
            status: 400,
            statusText: "Bad Request",
            error: (error instanceof Error) ? error.toString() : "",
            code: code
        });
    }

    public  sendUnauthorized(res: IResponse, error?, code?) {
        res.status(401).json({
            status: 401,
            statusText: "Unauthorized",
            error: error ? error.toString() : "",
            code: code
        });
    }

    public  sendNotFound(res: IResponse, error?, code?) {
        res.status(404).json({
            status: 404,
            statusText: "Not Found",
            error: error ? error.toString() : "",
            code: code
        });
    }

    public  getModel<T>(req: IRequest): T {
        return (req as any).model;
    }
}
