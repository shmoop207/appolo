"use strict";
import    _ = require('lodash');
import {Controller} from '../controller/controller';
import {IEnv, Injector} from "appolo-engine";
import {Agent, Methods, MiddlewareHandlerParams} from "appolo-agent";
import {IMiddlewareCtr} from "../interfaces/IMiddleware";
import {Route} from "./route";
import {IController} from "../controller/IController";
import {IOptions} from "../interfaces/IOptions";
import {invokeActionMiddleware, invokeMiddleWare, invokeMiddleWareError} from "./invokeActionMiddleware";
import {checkValidationMiddleware} from "./checkValidationMiddleware";
import {Util} from "../util/util";


export class Router {

    protected readonly controllerSuffix: string = 'Controller';
    protected readonly actionSuffix: string = 'Action';

    private _isInitialize = false;

    protected _routes: Route<IController>[];

    constructor(private _env: IEnv, private _injector: Injector, private _options: IOptions, private _agent: Agent) {

        this._routes = [];
    }

    public initialize() {

        this._isInitialize = true;

        _.forEach(this._routes, route => this._initRoute(route))
    }

    public addRoute(route: Route<IController>) {

        this._routes.push(route);

        if (this._isInitialize) {
            setImmediate(() => this._initRoute(route))
        }
    }

    protected _initRoute(route: Route<IController>): void {

        let def = route.definition;

        if (def.$initialized) {
            return;
        }

        def.$initialized = true;

        //check if we have valid path
        if (!def.path.length || !def.action || (def.environments.length && !_.includes(def.environments, (this._env.name || this._env.type)))) {
            return;
        }

        def.controllerName = def.controller.replace(this.controllerSuffix, '');

        def.definition = this._injector.getDefinition(def.controller);

        let middewares = this._convertStrMiddleware(def.middleware).concat(this._convertStrMiddleware(def.middlewareError, true));

        if (!_.isEmpty(def.validations)) {
            middewares.unshift(checkValidationMiddleware);
        }

        middewares.push(invokeActionMiddleware);

        for (let i = 0, len = def.path.length; i < len; i++) {
            this._agent.add(def.method[i] || Methods.GET, def.path[i], middewares, def);
        }
    }

    private _convertStrMiddleware(middleware: (string | MiddlewareHandlerParams | IMiddlewareCtr)[], error: boolean = false): MiddlewareHandlerParams[] {

        let output:MiddlewareHandlerParams[] = [];

        for (let i = 0, len = middleware.length; i < len; i++) {

            let dto = middleware[i] as MiddlewareHandlerParams;

            let id =  Util.getClassId(middleware[i]);

            if(id){
                dto = error  ? invokeMiddleWareError(id) :invokeMiddleWare(id)
            }

            output.push(dto);
        }

        return output
    }


    public reset() {
        this._routes.length = 0;
    }

}

