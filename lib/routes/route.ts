"use strict";
import {IRouteOptions} from "../interfaces/IRouteOptions";
import {Methods, Hooks} from "appolo-agent";
import {Objects, Arrays} from "appolo-utils";
import {IMiddlewareCtr} from "../interfaces/IMiddleware";
import {IController} from "../controller/IController";
import {Util} from "../util/util";
import {MiddlewareHandlerErrorOrAny, MiddlewareHandlerOrAny, MiddlewareHandlerParams} from "appolo-agent/index";
import {Controller} from "../controller/controller";
import {StaticController} from "../controller/staticController";
import {IRequest} from "../interfaces/IRequest";
import {IResponse} from "../interfaces/IResponse";

let orderIndex = 0;


export class Route<T extends IController> {
    protected _route: IRouteOptions;
    protected _controller: string | typeof Controller | typeof StaticController;

    constructor(controller: string | typeof Controller | typeof StaticController) {
        this._controller = controller;
        this._route = {
            method: [],
            roles: [],
            environments: [],
            middleware: [],
            middlewareError: [],
            controller: Util.getControllerName(controller),
            path: [],
            order: orderIndex++,
            params: {},
            action: null,
            definition: null,
            headers: [],
            statusCode: 0,
            gzip: false,
            customRouteFn: [],
            customRouteParam: [],
            hooks: {
                preHandler: [],
                preMiddleware: [],
                onResponse: [],
                onRequest: [],
                onError: [],
                onSend: []
            }

        };
    }

    public get definition(): IRouteOptions {
        return this._route
    }

    public path(pathPattern: string): this {

        this._route.path.push(pathPattern);

        if (pathPattern == "/") {
            this.order(999998)
        } else if (pathPattern == "*") {
            this.order(999999);
        }

        return this;
    }

    public order(order: number): this {
        this._route.order = order;
        return this
    }

    public action(action: ((c: T) => Function) | string): this {

        this._route.action = action;

        return this;
    }

    public abstract(abstract: Partial<IRouteOptions>): this {

        let items = Objects.pick(abstract, "environments", "roles", "middleware", "convertToCamelCase", "params");

        Object.keys(items).forEach(key => {
            this[key](items[key]);
        });

        return this;
    }

    public extend(opts: { [index: string]: any }): this {
        Object.assign(this._route, opts);

        return this;
    }

    public param(key: string, value: any): this {
        this._route.params[key] = value;
        return this
    }

    public params(params: { [index: string]: any }): this {

        Objects.defaults(this._route.params, params || {});

        return this
    }

    // public validation(key: string | { [index: string]: joi.Schema } | RouteModel, validation?: joi.Schema): this {
    //     return this.validations(key, validation);
    // }

    // public validations(key: string | { [index: string]: joi.Schema } | RouteModel, validation?: joi.Schema): this {
    //
    //     if (key.constructor && key.constructor.prototype === RouteModel.constructor.prototype && (key as any).prototype && (key as any).prototype.__validations__) {
    //         key = (key as any).prototype.__validations__
    //     }
    //
    //     if (_.isObject(key)) {
    //
    //         _.extend(this._route.validations, key)
    //
    //     } else {
    //
    //         this._route.validations[key as string] = validation
    //     }
    //
    //     return this;
    // }

    public method(method: Methods): this {

        this._route.method.push(method);

        return this;
    }

    public environment(environment: string | string[]): this {
        return this.environments(environment)
    }

    public environments(environment: string | string[]): this {
        if (Array.isArray(environment)) {

            this._route.environments.push.apply(this._route.environments, environment);
        } else {

            this._route.environments.push(environment)
        }

        return this;
    }

    public convertToCamelCase(value: boolean): this {
        this._route.convertToCamelCase = value;
        return this
    }

    public error(middleware: string | MiddlewareHandlerErrorOrAny | IMiddlewareCtr, order: "head" | "tail" = "tail"): this {
        return this._addMiddleware(middleware, order, true)
    }

    public middleware(middleware: string | MiddlewareHandlerOrAny | IMiddlewareCtr, order: "head" | "tail" = "tail"): this {

        return this._addMiddleware(middleware, order, false)
    }

    private _addMiddleware(middleware: (string | MiddlewareHandlerParams | IMiddlewareCtr), order: "head" | "tail" = "tail", error = false): this {
        let arrMethod = order == "head" ? "unshift" : "push";
        //
        if (Array.isArray(middleware)) {
            return this.middlewares(middleware, order)
        }

        let middle: any = middleware;

        if (Objects.isPlain(middle) && (middle.order && middle.middleware)) {
            return this.middleware(middle.middleware, middle.order)
        }

        let id = Util.getClassId(middle);

        if (id) {
            middleware = id;
        }

        error ? this._route.middlewareError[arrMethod](middleware) : this._route.middleware[arrMethod](middleware);

        return this;
    }

    public middlewares(middlewares: string[] | MiddlewareHandlerOrAny[] | IMiddlewareCtr[], order: "head" | "tail" = "tail"): this {

        Arrays.arrayify(middlewares).forEach(fn => this.middleware(fn as any, order));

        return this;
    }

    public addHook(name: Hooks.OnError, ...hook: (string | MiddlewareHandlerErrorOrAny | IMiddlewareCtr)[]): this
    public addHook(name: Hooks.OnResponse | Hooks.PreMiddleware | Hooks.PreHandler | Hooks.OnRequest, ...hook: (string | MiddlewareHandlerErrorOrAny | IMiddlewareCtr)[]): this
    public addHook(name: Hooks.OnSend, ...hook: (string | MiddlewareHandlerOrAny | IMiddlewareCtr)[]): this
    public addHook(name: Hooks, ...hook: (string | MiddlewareHandlerParams | IMiddlewareCtr)[]): this {

        this._route.hooks[name].push(...hook);

        return this
    }


    public role(role: string | string[]): this {
        return this.roles(role)
    }

    public roles(role: string | string[]): this {

        if (Array.isArray(role)) {

            this._route.roles.push.apply(this._route.roles, role);

        } else {

            this._route.roles.push(role)
        }

        return this;
    }

    public gzip(): this {
        this._route.gzip = true;
        return this
    }

    public headers(key: string, value: string): this {

        this._route.headers.push({key: key, value: value})

        return this
    }

    public customRouteFn(fn: (req: IRequest, res: IResponse, route: IRouteOptions) => void): this {

        this._route.customRouteFn.push(fn);

        return this
    }

    public customRouteParam(index: number, fn: (req: IRequest, res: IResponse, route: IRouteOptions) => void): this {

        this._route.customRouteParam.push({index, fn});

        this._route.customRouteParam = Arrays.sortBy(this._route.customRouteParam, data => data.index);

        return this
    }

    public statusCode(code: number): this {
        this._route.statusCode = code;

        return this;
    }

    public clone(): Route<T> {
        let route = new Route<T>(this._controller);

        route._route = Objects.cloneDeep(this._route);

        return route;
    }

    // route<T extends IController>(controller: string | IControllerCtr): Route<T> {
    //     return new Route<T>(controller || this._route.controller);
    // }
}

// export default function <T extends IController>(controller: string | IControllerCtr): Route<T> {
//     return new Route<T>(controller)
// }
