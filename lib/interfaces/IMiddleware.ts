import {IRouteOptions} from "./IRouteOptions";
import { NextFn} from "appolo-agent";
import {IRequest} from "./IRequest";
import {IResponse} from "./IResponse";


export interface IMiddleware {
    run(req: IRequest, res: IResponse, next: NextFn, route: IRouteOptions)
}


export interface IMiddlewareCtr {
    new(...args: any[]): IMiddleware
}


export const RequestContextSymbol = Symbol("requestContext");
