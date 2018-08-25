import {IRouteOptions} from "./IRouteOptions";
import {IRequest, IResponse, NextFn} from "appolo-agent";


export interface IMiddleware {
    run(req: IRequest, res: IResponse, next: NextFn, route: IRouteOptions)
}


export interface IMiddlewareCtr {
    new(...args: any[]): IMiddleware
}


export const RequestContextSymbol = Symbol("requestContext");
