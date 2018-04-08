import * as _ from 'lodash';
import * as joi from "joi";
import {Route} from "../routes/route";
import {Methods, MiddlewareHandler} from "appolo-agent";
import {IMiddlewareCtr} from "../interfaces/IMiddleware";
import {IRouteOptions} from "../interfaces/IRouteOptions";
import {RouteModel} from "../routes/routeModel";
import {Util} from "../util/util";
import {IController} from "../controller/IController";

export const RouterDefinitionsSymbol = Symbol("__RouterDefinitions__");
export const RouterModelSymbol = Symbol("__RouterModelDefinitions__");


function defineRouteProperty(params: { name: string, args: any[] }[]): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void {

    return function (params: { name: string, args: any[] }[], target: any, propertyKey: string, descriptor: PropertyDescriptor) {

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
export function path(path: string): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void {
    return defineRouteProperty([{name: "path", args: [path]}])
}

export function pathGet(path: string): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void {
    return defineRouteProperty([{name: "path", args: [path]}, {name: "method", args: [Methods.GET]}])
}

export function pathPost(path: string): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void {
    return defineRouteProperty([{name: "path", args: [path]}, {name: "method", args: [Methods.POST]}])
}

export function pathPatch(path: string): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void {
    return defineRouteProperty([{name: "path", args: [path]}, {name: "method", args: [Methods.PATCH]}])
}

export function pathPut(path: string): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void {
    return defineRouteProperty([{name: "path", args: [path]}, {name: "method", args: [Methods.PUT]}])
}

export function pathDelete(path: string): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void {
    return defineRouteProperty([{name: "path", args: [path]}, {name: "method", args: [Methods.DELETE]}])
}

export function method(method: 'get' | 'post' | 'delete' | 'patch' | 'head' | 'put' | Methods) {
    return defineRouteProperty([{name: "method", args: [method]}])
}

export function middleware(middleware: string | string[] | MiddlewareHandler | MiddlewareHandler[] | IMiddlewareCtr | IMiddlewareCtr[] | ((req: any, res: any, next: any) => void) | ((req: any, res: any, next: any) => void)[]): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void {

    if (_.isArray(middleware)) {
        middleware = _(middleware).clone().reverse()
    }

    return defineRouteProperty([{name: "middleware", args: [middleware, "head"]}])
}

export function validation(key: string | { [index: string]: joi.Schema } | RouteModel, validation?: joi.Schema): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void {
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

    _.forEach(route, (value, key) => {
        //we need to insert middlewares in reverse order
        if (key == "middleware") {
            route[key] = {middleware: _.isArray(value) ? value.reverse() : value, order: "head"} as any
        }
    });

    return defineRouteProperty([{name: "abstract", args: [route]}])
}

export function roles(role: string | string[]): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void {

    return defineRouteProperty([{name: "roles", args: [role]}])
}
