import {IRouteOptions} from "./IRouteOptions";
import {NextFn,IResponse,IRequest} from "appolo-agent";


export interface IMiddleware{
 run(req:IRequest, res:IResponse, next:NextFn,route:IRouteOptions)
}


export interface IMiddlewareCtr {
    new (...args: any[]): IMiddleware
}