import appolo = require('appolo-engine');
import {IRouteOptions} from "../interfaces/IRouteOptions";
import {Controller} from "../controller/controller";
import {Functions, Strings} from "appolo-utils";
import {StaticController} from "../controller/staticController";
import {Hooks, MiddlewareHandlerParams, Request, Response} from "appolo-agent";
import {IMiddlewareCtr, MiddlewareType} from "../interfaces/IMiddleware";
import {invokeMiddleWare, invokeMiddleWareData, invokeMiddleWareError} from "../routes/invokeActionMiddleware";
import {Route} from "../routes/route";
import {RouterDefinitionsCompiledSymbol, RouterDefinitionsSymbol} from "../decorators/decorators";
import {IController} from "../controller/IController";
import {Reflector} from "appolo-utils/index";

export class Util extends appolo.Util {

    public static convertSnakeCaseToCamelCase(str: string) {
        return str.replace(/(\_\w)/g, function (m) {
            return m[1].toUpperCase();
        });
    }

    public static convertModelToCamelCase(model: any): any {

        let keys = Object.keys(model);

        let output = {};

        for (let i = 0, len = keys.length; i < len; i++) {
            let key = keys[i];
            output[Util.convertSnakeCaseToCamelCase(key)] = model[key]
        }
        return output
    }


    public static isClass(v: any): boolean {
        return typeof v === 'function' && v.name && /^\s*class\s+/.test(v.toString());
    }

    public static reverseMiddleware(route: Partial<IRouteOptions>) {
        Object.keys(route || {}).forEach(key => {
            let value = route[key];
            //we need to insert middlewares in reverse order
            if (key == "middleware") {
                route[key] = {
                    middleware: Array.isArray(value) ? value.reverse() : value,
                    order: "head"
                } as any
            }
        });
    }

    public static getControllerName(controller: string | typeof Controller | typeof StaticController): string {
        return Functions.isFunction(controller) && controller.name ? Util.getClassName(controller) : controller as string
    }

    public static decorateRequest(name: string, fn: Function) {
        Request.prototype[name] = function () {
            return fn.apply(this, arguments)
        }
    }

    public static decorateResponse(name: string, fn: Function) {
        Response.prototype[name] = function () {
            return fn.apply(this, arguments)
        }
    }

    public static getRouteDefinition<T extends IController>(fn: any, action: ((c: T) => Function) | string): Route<T> {

        action = Strings.isString(action) ? action : (action as Function)(fn.prototype).name;

        let route = Reflect.getMetadata(RouterDefinitionsCompiledSymbol, fn, action as string);

        return route
    }

    public static createRouteDefinition<T extends IController>(fn: any, action: ((c: T) => Function) | string): Route<T> {
        let data = Reflector.getFnMetadata<{ [index: string]: Route<IController> }>(RouterDefinitionsSymbol, fn, {});

        let propertyKey = Strings.isString(action) ? action : (action as Function)(fn.prototype).name;

        let route = data[propertyKey];

        if (!route) {
            data[propertyKey] = route = new Route<IController>(fn);
            route.action(propertyKey);
        } else {
            route = data[propertyKey] = route.clone();
        }

        return route;
    }

    public static isController(fn: any): boolean {
        return Reflect.hasMetadata(RouterDefinitionsCompiledSymbol, fn);
    }

    public static convertMiddleware(middleware: (string | MiddlewareHandlerParams | IMiddlewareCtr)[], type: MiddlewareType): MiddlewareHandlerParams[] {

        let output: MiddlewareHandlerParams[] = [];

        for (let i = 0, len = middleware.length; i < len; i++) {

            let dto = middleware[i] as MiddlewareHandlerParams;

            let id = Util.getClassId(middleware[i]);

            if (id) {
                dto = type == MiddlewareType.MiddleWare ? invokeMiddleWare(id) : type == MiddlewareType.Error ? invokeMiddleWareError(id) : invokeMiddleWareData(id)
            }

            output.push(dto);
        }

        return output
    }

    public static convertMiddlewareHooks(name: Hooks, hooks: (string | MiddlewareHandlerParams | IMiddlewareCtr)[]): MiddlewareHandlerParams[] {
        return Util.convertMiddleware(hooks, name == Hooks.OnSend ? MiddlewareType.Data : name == Hooks.OnError ? MiddlewareType.Error : MiddlewareType.MiddleWare);

    }


}

