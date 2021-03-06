import {
    Methods,
    MiddlewareHandlerErrorOrAny,
    MiddlewareHandlerOrAny,
    MiddlewareHandlerParams
} from "@appolo/agent/index";
import {Route as FRoute, Controller, IController, StaticController, Middleware, StaticMiddleware} from "@appolo/route";
import {Launcher} from "../launcher/launcher";
import    http = require('http');
import    https = require('https');

export class Route {

    constructor(private _launcher: Launcher) {
    }

    public use(path?: (string | MiddlewareHandlerOrAny | typeof Middleware | typeof StaticMiddleware), ...middleware: (MiddlewareHandlerOrAny | typeof StaticMiddleware | typeof Middleware)[]): this {

        this._launcher.router.addMiddleware(path, middleware, false);
        return this;
    }

    public error(path?: (string | MiddlewareHandlerErrorOrAny | typeof Middleware | typeof StaticMiddleware), ...middleware: (string | MiddlewareHandlerErrorOrAny | typeof StaticMiddleware | typeof Middleware)[]): this {

        this._launcher.router.addMiddleware(path, middleware, true);
        return this;
    }

    public getRoute<T extends IController>(path: string, method: Methods): FRoute<T> {
        return this._launcher.router.getRoute(path, method)
    }

    public getRoutesByController(fn: any, action?: string) {
        return this.getRoutes().find(route => route.definition.controller === fn && (action ? route.definition.actionName == action : true))
    }

    public getRoutes() {
        return this._launcher.router.routes;
    }

    public get hooks() {
        return this._launcher.router.hooks
    }

    public createRoute<T extends IController>(controller: string | typeof Controller | typeof StaticController): FRoute<T> {
        let route = new FRoute(controller);

        this._launcher.router.addRoute(route);

        return route
    }

    public createRouteFromClass(klass: typeof Controller) {
        this._launcher.router.addRouteFromClass(klass)
    }

    public get(path: string, ...handler: MiddlewareHandlerParams[]): this {
        this._launcher.agent.get(path, ...handler);
        return this;
    }

    public post(path: string, ...handler: MiddlewareHandlerParams[]): this {
        this._launcher.agent.post(path, ...handler);
        return this;
    }

    public delete(path: string, ...handler: MiddlewareHandlerParams[]): this {
        this._launcher.agent.post(path, ...handler);
        return this;
    }

    public patch(path: string, ...handler: MiddlewareHandlerParams[]): this {
        this._launcher.agent.patch(path, ...handler);
        return this;
    }

    public get server(): http.Server | https.Server {
        return this._launcher.agent.server
    }

    public startServer() {
        return this._launcher.startServer()
    }

    public get port(): number {
        return this._launcher.port
    }

    public get isServerRunning(): boolean {
        return this._launcher.isServerRunning
    }


    public handle = (request: http.IncomingMessage, response: http.ServerResponse) => {
        this._launcher.agent.handle(request, response)
    }
}
