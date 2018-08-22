"use strict";
import    _ = require('lodash');
import {Controller} from '../controller/controller';
import {IEnv, Injector} from "appolo-engine";
import {Agent, HttpError, IResponse, Methods, MiddlewareHandlerParams, NextFn} from "appolo-agent";
import {IMiddleware, IMiddlewareCtr} from "../interfaces/IMiddleware";
import {Route} from "./route";
import {IController} from "../controller/IController";
import {IOptions} from "../interfaces/IOptions";
import {IRequest} from "../interfaces/IRequest";
import {invokeActionMiddleware} from "./invokeActionMiddleware";
import {checkValidationMiddleware} from "./checkValidationMiddleware";


export class Router {

    protected readonly controllerSuffix: string = 'Controller';
    protected readonly actionSuffix: string = 'Action';

    protected _routes: Route<IController>[];

    constructor(private _env: IEnv, private _injector: Injector, private _options: IOptions, private _agent: Agent) {

        this._routes = [];
    }

    public initialize() {

        _.forEach(this._routes, route => this._initRoute(route))
    }

    public addRoute(route: Route<IController>) {

        this._routes.push(route);

        if (route.definition.action && route.definition.path.length) {
            this._initRoute(route)
        }
        else {
            setImmediate(() => this._initRoute(route))
        }
    }

    protected _initRoute(route: Route<IController>): void {

        let def = route.definition;
        let middleware = _.clone(def.middleware);

        //check if we have valid path
        if (!def.path.length || !def.action || (def.environments.length && !_.includes(def.environments, (this._env.name || this._env.type)))) {
            return;
        }

        def.controllerName = def.controller.replace(this.controllerSuffix, '');

        this._convertStrMiddleware(middleware);

        if (!_.isEmpty(def.validations)) {
            middleware.unshift(checkValidationMiddleware);
        }

        middleware.push(invokeActionMiddleware);


        for (let i = 0, len = def.path.length; i < len; i++) {
            this._agent.add(def.method[i] || Methods.GET, def.path[i], middleware as MiddlewareHandlerParams[], def);
        }
    }

    private _convertStrMiddleware(middleware: (string | MiddlewareHandlerParams | IMiddlewareCtr)[]) {
        for (let i = 0, len = middleware.length; i < len; i++) {
            if (_.isString(middleware[i])) {
                middleware[i] = this._invokeMiddleWare.bind(this, middleware[i])
            }
        }
    }

    protected _invokeMiddleWare(middlewareId: string, req: IRequest, res: IResponse, next: NextFn) {

        let middleware: IMiddleware = this._injector.getObject<IMiddleware>(middlewareId, [req, res, next, req.route]);

        if (!middleware) {
            next(new HttpError(500, `failed to find middleware ${middlewareId}`));
        }

        middleware.run(req, res, next, req.route);

    }


    public reset() {
        this._routes.length = 0;
    }

}

