import * as _ from 'lodash';
import * as joi from "joi";
import {Route} from "../routes/route";
import {MiddlewareHandler, MiddlewareHandlerAny, Methods} from "appolo-agent";
import {IMiddlewareCtr} from "../interfaces/IMiddleware";
import {IRouteOptions} from "../interfaces/IRouteOptions";
import {RouteModel} from "../routes/routeModel";

export const RouterDefinitionsSymbol = Symbol("__RouterDefinitions__");


function defineRouteProperty(params: { name: string, args: any[] }[]): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void {

    return function (params: { name: string, args: any[] }[], target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        let data = Reflect.getOwnMetadata(RouterDefinitionsSymbol, target.constructor) || _.cloneDeep(Reflect.getMetadata(RouterDefinitionsSymbol, target.constructor));

        if (!data) {
            data = {};
            Reflect.defineMetadata(RouterDefinitionsSymbol, data, target.constructor);
        }

        let route = data[propertyKey];

        if (!route) {
            data[propertyKey] = route = new Route<any>(target.constructor);
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
    if (key.constructor && key.constructor.prototype === RouteModel.constructor.prototype && (key as any).prototype && (key as any).prototype.__validations__) {
        key = (key as any).prototype.__validations__
    }

    return defineRouteProperty([{name: "validation", args: [key, validation]}])
}

export function validationParam(validation: joi.Schema): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        if (target.constructor.prototype.__validations__ && !target.constructor.prototype.hasOwnProperty("__validations__")) {
            target.constructor.prototype.__validations__ = _.cloneDeep(target.constructor.prototype.__validations__);
        }

        let validations = target.constructor.prototype.__validations__ || (target.constructor.prototype.__validations__ = {});
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


// export function injectParam(name?: string) {
//     return function logParameter(target: any, propertyKey: string, index: number) {
//         let args = [];
//
//         // //we have a constructor
//         if (!propertyKey) {
//             if (target.prototype.__inject__) {
//                 args = appolo.Util.getFunctionArgs(target);
//                 target.prototype.__inject__.push({name: "args", args: [{ref: args[index]}]});
//             }
//             return;
//         }
//
//         args = appolo.Util.getFunctionArgs(target.constructor.prototype[propertyKey]);
//
//         if (!target.constructor.prototype.__param_inject__) {
//             target.constructor.prototype.__param_inject__ = []
//         }
//
//
//         target.constructor.prototype.__param_inject__.push({
//             param: name || args[index],
//             method: propertyKey,
//             index: index
//         })
//
//   }
//}