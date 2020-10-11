import {
    Methods,
    MiddlewareHandlerErrorOrAny,
    MiddlewareHandlerOrAny,
    MiddlewareHandlerParams
} from "@appolo/agent/index";
import {Route as FRoute,Controller, IController, IMiddlewareCtr, StaticController} from "@appolo/route";
import {Launcher} from "../launcher/launcher";
import    http = require('http');
import    https = require('https');

export class Route {

    constructor(private _launcher:Launcher) {
    }

    public use(path?: (string | MiddlewareHandlerOrAny | IMiddlewareCtr), ...middleware: (MiddlewareHandlerOrAny | IMiddlewareCtr)[]): this {

        this._launcher.router.addMiddleware(path, middleware, false);
        return this;
    }

    public error(path?: (string | MiddlewareHandlerErrorOrAny | IMiddlewareCtr), ...middleware: (string | MiddlewareHandlerErrorOrAny | IMiddlewareCtr)[]): this {

        this._launcher.router.addMiddleware(path, middleware, true);
        return this;
    }

    public getRoute<T extends IController>(path: string, method: Methods): FRoute<T> {
        return this._launcher.router.getRoute(path, method)
    }

    public get hooks(){
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


    public handle = (request: http.IncomingMessage, response: http.ServerResponse) => {
        this._launcher.agent.handle(request, response)
    }
}
