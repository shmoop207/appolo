"use strict";
import {Controller} from '../controller/controller';
import {IEnv, Injector} from "appolo-engine";
import {Agent, Methods, Hooks} from "appolo-agent";
import { MiddlewareType} from "../interfaces/IMiddleware";
import {Route} from "./route";
import {IController} from "../controller/IController";
import {IOptions} from "../interfaces/IOptions";
import {
    invokeActionMiddleware,
    invokeCustomRouteMiddleWare,
} from "./invokeActionMiddleware";
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

        this._routes.forEach( route => this._initRoute(route))
    }

    public getRoute(path: string, method: string): Route<any> {
        return this._routes.find(route => route.definition.path.includes(path) && route.definition.method.includes(method as Methods))

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
        if (!def.path.length || !def.action || (def.environments.length && def.environments.indexOf(this._env.name || this._env.type) == -1)) {
            return;
        }

        def.controllerName = def.controller.replace(this.controllerSuffix, '');

        def.definition = this._injector.getDefinition(def.controller);

        let middewares = Util.convertMiddleware(def.middleware, MiddlewareType.MiddleWare).concat(Util.convertMiddleware(def.middlewareError, MiddlewareType.Error));

        if (def.gzip || def.statusCode || def.headers.length || def.customRouteFn.length) {
            middewares.unshift(invokeCustomRouteMiddleWare);
        }

        // if (!_.isEmpty(def.validations)) {
        //     middewares.unshift(checkValidationMiddleware);
        // }

        middewares.push(invokeActionMiddleware);

        let hooks = {};
        Object.keys(def.hooks || {}).forEach(key => {
            let hook = def.hooks[key];
            hooks[key] = Util.convertMiddlewareHooks(key as Hooks, hook)
        });


        for (let i = 0, len = def.path.length; i < len; i++) {
            this._agent.add(def.method[i] || Methods.GET, def.path[i], middewares, def, hooks);
        }
    }


    public reset() {
        this._routes.length = 0;
    }

}

