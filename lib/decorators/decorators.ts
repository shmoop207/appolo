import {Route} from "../routes/route";
import {
    Hooks,
    Methods,
    MiddlewareHandlerErrorOrAny,
    MiddlewareHandlerOrAny,
    MiddlewareHandlerParams
} from "appolo-agent";
import {define} from "appolo-engine";
import {Arrays} from "appolo-utils";
import {IMiddlewareCtr} from "../interfaces/IMiddleware";
import {IRouteOptions} from "../interfaces/IRouteOptions";
import {Util} from "../util/util";
import {IController} from "../controller/IController";
import {IRequest} from "../interfaces/IRequest";
import {IResponse} from "../interfaces/IResponse";

export const RouterDefinitionsSymbol = "__RouterDefinitions__";
export const RouterDefinitionsCompiledSymbol = "__RouterDefinitionsCompiled__";
export const RouterDefinitionsClassSymbol = "__RouterDefinitionsClass__";
export const RouterModelSymbol = "__RouterModelDefinitions__";
export const RouterControllerSymbol = "__RouterControllerDefinitions__";

function defineRouteClass(params: { name: string, args: any[] }[], target: any): void {

    let route = Util.getReflectData<Route<IController>>(RouterDefinitionsClassSymbol, target, new Route<IController>(target));

    (params || []).forEach(param => {
        route[param.name].apply(route, param.args)
    });
}

export function controller(name?: string): (target: any) => void {

    return function (name: string, target: any) {

        Reflect.defineMetadata(RouterControllerSymbol, name || "", target);

        define("")(target);


    }.bind(null, name)
}


function defineRouteProperty(params: { name: string, args: any[] }[]): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void {

    return function (params: { name: string, args: any[] }[], target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        if (!propertyKey) {
            defineRouteClass(params, target)
        }

        let data = Util.getReflectData<{ [index: string]: Route<IController> }>(RouterDefinitionsSymbol, target.constructor, {});

        let route = data[propertyKey];

        if (!route) {
            data[propertyKey] = route = new Route<IController>(target.constructor);
            route.action(propertyKey);
        }

        (params || []).forEach(param => {
            route[param.name].apply(route, param.args)
        })

    }.bind(null, params)
}

//
// export function path(path: string): any {
//     return defineRouteProperty([{name: "path", args: [path]}, {name: "method", args: [Methods.GET]}])
//
// }

export function get(path?: string): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void {
    return defineRouteProperty([{name: "path", args: [path || ""]}, {name: "method", args: [Methods.GET]}])
}

export function post(path?: string): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void {
    return defineRouteProperty([{name: "path", args: [path || ""]}, {name: "method", args: [Methods.POST]}])
}

export function patch(path?: string): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void {
    return defineRouteProperty([{name: "path", args: [path || ""]}, {name: "method", args: [Methods.PATCH]}])
}

export function put(path?: string): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void {
    return defineRouteProperty([{name: "path", args: [path || ""]}, {name: "method", args: [Methods.PUT]}])
}

export function del(path?: string): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void {
    return defineRouteProperty([{name: "path", args: [path || ""]}, {name: "method", args: [Methods.DELETE]}])
}

export function purge(path?: string): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void {
    return defineRouteProperty([{name: "path", args: [path || ""]}, {name: "method", args: [Methods.PURGE]}])
}

export function method(method: 'get' | 'post' | 'delete' | 'patch' | 'head' | 'put' | Methods) {
    return defineRouteProperty([{name: "method", args: [method]}])
}

export function hook(name: Hooks.OnError, ...hook: (string | MiddlewareHandlerErrorOrAny | IMiddlewareCtr)[])
export function hook(name: Hooks.OnResponse | Hooks.PreMiddleware | Hooks.PreHandler | Hooks.OnRequest, ...hook: (string | MiddlewareHandlerErrorOrAny | IMiddlewareCtr)[])
export function hook(name: Hooks.OnSend, ...hook: (string | MiddlewareHandlerOrAny | IMiddlewareCtr)[])
export function hook(name: Hooks, ...hook: (string | MiddlewareHandlerParams | IMiddlewareCtr)[]) {
    return defineRouteProperty([{name: "addHook", args: [name, ...hook]}])
}


export function middleware(middleware: string | string[] | MiddlewareHandlerOrAny | MiddlewareHandlerOrAny[] | IMiddlewareCtr | IMiddlewareCtr[]): any {

    if (Array.isArray(middleware)) {
        middleware = Arrays.clone(middleware as string[]).reverse()
    }

    return defineRouteProperty([{name: "middleware", args: [middleware, "head"]}])
}

export function error(middleware: string | string[] | MiddlewareHandlerErrorOrAny | MiddlewareHandlerErrorOrAny[] | IMiddlewareCtr | IMiddlewareCtr[]): any {

    if (Array.isArray(middleware)) {
        middleware =  Arrays.clone(middleware as string[]).reverse()
    }

    return defineRouteProperty([{name: "error", args: [middleware, "head"]}])
}


export function abstract(route: Partial<IRouteOptions>): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void {

    Util.reverseMiddleware(route);


    return defineRouteProperty([{name: "abstract", args: [route]}])
}

export function roles(role: string | string[]): any {

    return defineRouteProperty([{name: "roles", args: [role]}])
}


export function gzip() {
    return defineRouteProperty([{name: "gzip", args: []}])
}

export function header(key: string, value: string) {
    return defineRouteProperty([{name: "headers", args: [key, value]}])
}

export function statusCode(code: number) {
    return defineRouteProperty([{name: "statusCode", args: [code]}])
}


export function customRouteDecorator(fn: ((req: IRequest, res: IResponse, route: IRouteOptions) => void)) {
    return defineRouteProperty([{name: "customRouteFn", args: [fn]}])
}

export function customRouteParam(fn: ((req: IRequest, res: IResponse, route: IRouteOptions) => void)) {

    return function (target: Object, propertyKey: string, parameterIndex: number) {
        defineRouteProperty([{name: "customRouteParam", args: [parameterIndex, fn]}])(target, propertyKey)
    }
}

export let body = function (param?: string) {
    return customRouteParam(function (req: IRequest) {
        return param != undefined ? req.body[param] : req.body
    })
}

export let headers = function (param?: string) {
    return customRouteParam(function (req: IRequest) {
        return param != undefined ? req.headers[param] : req.headers
    })
}

export let query = function (param?: string) {
    return customRouteParam(function (req: IRequest) {
        return param != undefined ? req.query[param] : req.query
    })
}

export let model = function (param?: string) {
    return customRouteParam(function (req: IRequest) {

        if (!req.model) {
            req.model = Object.assign({}, req.body || {}, req.query || {}, req.params || {});
        }

        return param != undefined ? req.model[param] : req.model
    })
}

export let params = function (param?: string) {
    return customRouteParam(function (req: IRequest) {
        return param != undefined ? req.params[param] : req.params
    })
}

export let req = function () {
    return customRouteParam(function (req: IRequest) {
        return req
    })
}

export let res = function () {
    return customRouteParam(function (req: IRequest, res: IResponse) {
        return res
    })
}

