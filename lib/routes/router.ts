"use strict";
import    _ = require('lodash');
import    joi = require('joi');
import {Controller} from '../controller/controller';
import {IEnv, Injector} from "appolo-engine";
import {Agent, HttpError, IRequest, IResponse, Methods, MiddlewareHandlerParams, NextFn} from "appolo-agent";
import {IMiddleware, IMiddlewareCtr} from "../interfaces/IMiddleware";
import {Route} from "./route";
import {IController} from "../controller/IController";
import {IOptions} from "../interfaces/IOptions";
import {StaticController} from "../controller/staticController";


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

        middleware.push((req: IRequest, res: IResponse, next: NextFn) => this._invokeAction(req, res, next));

        if (!_.isEmpty(def.validations)) {
            middleware.unshift(this._checkValidation);
        }

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

    protected _invokeAction(req: IRequest, res: IResponse, next: NextFn) {

        let route = req.route;

        let controller: StaticController = this._injector.getObject<StaticController>(route.controller, [req, res, route]);

        if (!controller) {
            next(new HttpError(500, `failed to find controller ${route.controller}`));
            return;
        }

        let fnName: string = route.actionName;

        if (!fnName) {
            fnName = _.isString(route.action) ? route.action : route.action(controller).name;

            if (!controller[fnName]) {
                next(new HttpError(500, `failed to invoke ${this.constructor.name} fnName ${fnName}`));
                return;
            }

            route.actionName = fnName;
        }

        return controller[fnName](req, res, route, req.model);
    };

    protected _checkValidation = (req: IRequest, res: IResponse, next: NextFn) => {

        let data = _.extend({}, req.params, req.query, (req as any).body);

        joi.validate(data, req.route.validations, this._options.validatorOptions, function (e, params) {

            if (e) {
                next(new HttpError(400, e.toString(), {
                    status: 400,
                    statusText: "Bad Request",
                    error: e.toString(),
                    code: 400
                }));
                return;
            }

            req.model = params;

            next();
        });
    };

    public reset() {
        this._routes.length = 0;
    }

}

