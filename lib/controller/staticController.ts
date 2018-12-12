"use strict";
import {BadRequestError, InternalServerError, NotFoundError, UnauthorizedError} from "appolo-agent";
import {IController} from "./IController";
import {IResponse} from "../interfaces/IResponse";
import {IRequest} from "../interfaces/IRequest";

export abstract class StaticController implements IController {

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

    public sendCreated(res: IResponse, data?: any) {
        res.status(201).send(data);
    }

    public sendNoContent(res: IResponse) {
        res.status(204).send();
    }

    public sendError(res: IResponse, error?: Error | string, code?: number, data?: any) {

        throw new InternalServerError(error, data, code)
    }

    public sendBadRequest(res: IResponse, error?: Error | string, code?: number, data?: any) {
        throw new BadRequestError(error, data, code)
    }

    public sendUnauthorized(res: IResponse, error?: Error | string, code?: number, data?: any) {
        throw new UnauthorizedError(error, data, code)
    }

    public sendNotFound(res: IResponse, error?: Error | string, code?: number, data?: any) {
        throw new NotFoundError(error, data, code)
    }

    public getModel<T>(req: IRequest): T {
        return (req as any).model;
    }
}
