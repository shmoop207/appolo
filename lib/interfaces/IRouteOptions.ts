import    joi = require('joi');
import {IController} from "../controller/IController";
import {IMiddlewareCtr} from "./IMiddleware";
import {Methods, MiddlewareHandlerParams} from "appolo-agent";
import {IDefinition} from "appolo-engine";
import {IRequest} from "./IRequest";
import {IResponse} from "./IResponse";


export interface IRouteOptions {
    controller?: string
    action?: ((c: IController) => Function) | string
    environments?: string[]
    roles?: string[]
    middleware?: (string | MiddlewareHandlerParams | IMiddlewareCtr)[]
    middlewareError?: (string | MiddlewareHandlerParams | IMiddlewareCtr)[]
    validations?: { [index: string]: joi.Schema }
    path?: string[]
    abstract?: boolean,
    convertToCamelCase?: boolean
    method?: Methods[]
    order: number
    params: { [index: string]: any }
    controllerName?: string
    actionName?: string
    definition: IDefinition
    $initialized?: boolean
    headers: { key: string, value: string }[]
    customRouteFn:((req:IRequest,res:IResponse,route:IRouteOptions)=>void)[]
    statusCode: number
    gzip: boolean


}

// export interface IRouteInnerOptions {
//     route: IRouteOptions
//     middlewareHandler?: MiddlewareHandler[]
//     methodUpperCase?: string
//     regExp: RegExp
//     paramsKeys: { [index: string]: any }
// }