import * as _ from 'lodash';
import * as joi from "joi";
import {Route} from "../routes/route";
import {Methods, MiddlewareHandler} from "appolo-agent";
import {define} from "appolo-engine";
import {IMiddlewareCtr} from "../interfaces/IMiddleware";
import {IRouteOptions} from "../interfaces/IRouteOptions";
import {RouteModel} from "../routes/routeModel";
import {Util} from "../util/util";
import {IController} from "../controller/IController";
import {IRequest} from "../interfaces/IRequest";
import {IResponse} from "../interfaces/IResponse";

export const RouterDefinitionsSymbol = "__RouterDefinitions__";
export const RouterDefinitionsClassSymbol = "__RouterDefinitionsClass__";
export const RouterModelSymbol = "__RouterModelDefinitions__";
export const RouterControllerSymbol = "__RouterControllerDefinitions__";

function defineRouteClass(params: { name: string, args: any[] }[], target: any): void {

    let route = Util.getReflectData<Route<IController>>(RouterDefinitionsClassSymbol, target, new Route<IController>(target));

    _.forEach(params, param => {
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

        _.forEach(params, param => {
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

export function method(method: 'get' | 'post' | 'delete' | 'patch' | 'head' | 'put' | Methods) {
    return defineRouteProperty([{name: "method", args: [method]}])
}

export function middleware(middleware: string | string[] | MiddlewareHandler | MiddlewareHandler[] | IMiddlewareCtr | IMiddlewareCtr[] | ((req: any, res: any, next: any) => void) | ((req: any, res: any, next: any) => void)[]): any {

    if (_.isArray(middleware)) {
        middleware = _(middleware).clone().reverse()
    }

    return defineRouteProperty([{name: "middleware", args: [middleware, "head"]}])
}

export function validation(key: string | { [index: string]: joi.Schema } | RouteModel, validation?: joi.Schema): any {
    if (key.constructor && key.constructor.prototype === RouteModel.constructor.prototype && (key as any).prototype && Reflect.hasMetadata(RouterModelSymbol, key)) {
        key = Reflect.getMetadata(RouterModelSymbol, key)
    }

    return defineRouteProperty([{name: "validation", args: [key, validation]}])
}

export function validationParam(validation: joi.Schema): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        let validations = Util.getReflectData<{ [index: string]: joi.Schema }>(RouterModelSymbol, target.constructor, {});

        validations[propertyKey] = validation;
    }
}

export function abstract(route: Partial<IRouteOptions>): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void {

    Util.reverseMiddleware(route);


    return defineRouteProperty([{name: "abstract", args: [route]}])
}

export function roles(role: string | string[]): any {

    return defineRouteProperty([{name: "roles", args: [role]}])
}


export function gzip() {
    return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {

        let old = descriptor.value;

        descriptor.value = async function (req: IRequest, res: IResponse) {
            res.gzip();

            return old.apply(this, arguments);
        }
    }
}