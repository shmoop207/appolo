import    joi = require('joi');
import {IController} from "../controller/IController";
import {IMiddlewareCtr} from "./IMiddleware";
import {MiddlewareHandler, Methods, MiddlewareHandlerParams} from "appolo-agent";
import {MiddlewareHandlerAny} from "appolo-agent/index";


export interface IRouteOptions {
    controller?: string
    action?: ((c: IController) => Function) | string
    environments?: string[]
    roles?: string[]
    middleware?: (string | MiddlewareHandlerParams | IMiddlewareCtr)[]
    validations?: { [index: string]: joi.Schema }
    path?: string[]
    abstract?: boolean,
    convertToCamelCase?: boolean
    method?: Methods[]
    order: number
    params: { [index: string]: any }
    controllerName?: string
    actionName?: string


}

// export interface IRouteInnerOptions {
//     route: IRouteOptions
//     middlewareHandler?: MiddlewareHandler[]
//     methodUpperCase?: string
//     regExp: RegExp
//     paramsKeys: { [index: string]: any }
// }