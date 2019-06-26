import appolo = require('appolo-engine');
import _ = require('lodash');
import {IRouteOptions} from "../interfaces/IRouteOptions";
import {Controller} from "../controller/controller";
import {StaticController} from "../controller/staticController";
import {Hooks, MiddlewareHandlerParams, Request, Response} from "appolo-agent";
import {IMiddlewareCtr, MiddlewareType} from "../interfaces/IMiddleware";
import {invokeMiddleWare, invokeMiddleWareData, invokeMiddleWareError} from "../routes/invokeActionMiddleware";
import {Route} from "../routes/route";
import {RouterDefinitionsCompiledSymbol, RouterDefinitionsSymbol} from "../decorators/decorators";
import {IController} from "../controller/IController";

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
        _.forEach(route, (value, key) => {
            //we need to insert middlewares in reverse order
            if (key == "middleware") {
                route[key] = {
                    middleware: _.isArray(value) ? value.reverse() : value,
                    order: "head"
                } as any
            }
        });
    }

    public static getControllerName(controller: string | typeof Controller | typeof StaticController): string {
        return _.isFunction(controller) && controller.name ? _.camelCase(controller.name) : controller as string
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

        action = _.isString(action) ? action : action(fn.prototype).name;

        let route = Reflect.getMetadata(RouterDefinitionsCompiledSymbol, fn, action);

        return route
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

