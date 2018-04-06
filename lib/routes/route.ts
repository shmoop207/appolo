"use strict";
import    _ = require('lodash');
import    joi = require('joi');
import {IRouteOptions} from "../interfaces/IRouteOptions";
import {MiddlewareHandlerAny, IRequest, IResponse, NextFn, Methods} from "appolo-agent";
import {IMiddleware, IMiddlewareCtr} from "../interfaces/IMiddleware";
import {IController, IControllerCtr} from "../controller/IController";
import {Util} from "../util/util";
import {RouteModel} from "./routeModel";
import {MiddlewareHandlerParams} from "appolo-agent/index";
import {Controller} from "../controller/controller";
import {StaticController} from "../controller/staticController";

let orderIndex = 0;


export class Route<T extends IController> {
    protected _route: IRouteOptions;

    constructor(controller: string | typeof Controller | typeof StaticController) {

        this._route = {
            method: [],
            roles: [],
            environments: [],
            middleware: [],
            validations: {},
            controller: _.isFunction(controller) && controller.name ? _.camelCase(controller.name) : controller as string,
            path: [],
            order: orderIndex++,
            params: {},
            action: null,

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

        let items = _.pick(abstract, ["environments", "roles", "middleware", "validations", "convertToCamelCase", "method", "params"]);

        _.forEach(items, (item: any, key: string) => {
            this[key](item);
        });

        return this;
    }

    public extend(opts: { [index: string]: any }): this {
        _.extend(this._route, opts);

        return this;
    }

    public param(key: string, value: any): this {
        this._route.params[key] = value;
        return this
    }

    public validation(key: string | { [index: string]: joi.Schema } | RouteModel, validation?: joi.Schema): this {
        return this.validations(key, validation);
    }

    public validations(key: string | { [index: string]: joi.Schema } | RouteModel, validation?: joi.Schema): this {

        if (key.constructor && key.constructor.prototype === RouteModel.constructor.prototype && (key as any).prototype && (key as any).prototype.__validations__) {
            key = (key as any).prototype.__validations__
        }

        if (_.isObject(key)) {

            _.extend(this._route.validations, key)

        } else {

            this._route.validations[key as string] = validation
        }

        return this;
    }

    public method(method: Methods): this {

        this._route.method.push(method);

        return this;
    }

    public environment(environment: string | string[]): this {
        return this.environments(environment)
    }

    public environments(environment: string | string[]): this {
        if (_.isArray(environment)) {

            this._route.environments.push.apply(this._route.environments, environment);
        }
        else {

            this._route.environments.push(environment)
        }

        return this;
    }

    public convertToCamelCase(value: boolean): this {
        this._route.convertToCamelCase = value;
        return this
    }

    public middleware(middleware: string | MiddlewareHandlerParams | IMiddlewareCtr, order: "head" | "tail" = "tail"): this {

        let arrMethod = order == "head" ? "unshift" : "push";
        //
        if (_.isArray(middleware)) {
            return this.middlewares(middleware, order)
        }

        let middle: any = middleware;

        if (_.isPlainObject(middle) && (middle.order && middle.middleware)) {
            return this.middleware(middle.middleware, middle.order)
        }

        if (Util.isClass(middleware)) {
            middleware = _.camelCase((middleware as IMiddlewareCtr).name)
        }

        this._route.middleware[arrMethod](middleware);


        // if (typeof middleware == "string") {
        //
        //     middleware = (function (middlewareId): MiddlewareHandler {
        //
        //         return function (req: IRequest, res: IResponse, next: NextFn) {
        //
        //             let middleware: IMiddleware = appolo.inject.getObject<IMiddleware>(middlewareId, [req, res, next, req.$route]);
        //
        //             if (!middleware) {
        //                 throw new Error("failed to find middleware " + middleware);
        //             }
        //
        //             middleware.run(req, res, next, req.route);
        //         }
        //     })(middleware);
        //
        //     this._route.middleware[arrMethod](middleware as MiddlewareHandler);
        // }

        return this;
    }

    public middlewares(middlewares: string[] | MiddlewareHandlerParams[] | IMiddlewareCtr[], order: "head" | "tail" = "tail"): this {

        _.forEach(_.isArray(middlewares) ? middlewares : [middlewares], fn => this.middleware(fn as any, order));

        return this;
    }


    public role(role: string | string[]): this {
        return this.roles(role)
    }

    public roles(role: string | string[]): this {

        if (_.isArray(role)) {

            this._route.roles.push.apply(this._route.roles, role);

        } else {

            this._route.roles.push(role)
        }

        return this;
    }

    // route<T extends IController>(controller: string | IControllerCtr): Route<T> {
    //     return new Route<T>(controller || this._route.controller);
    // }
}

// export default function <T extends IController>(controller: string | IControllerCtr): Route<T> {
//     return new Route<T>(controller)
// }