import    http = require('http');
import    https = require('https');
import    _path = require('path');
import    _ = require('lodash');
import {IOptions} from "./interfaces/IOptions";
import {IApp as IViewApp, MiddlewareHandler, MiddlewareHandlerAny} from "appolo-agent";
import {
    Define,
    EventDispatcher,
    Events as EngineEvents,
    IApp as IEngineApp,
    IClass,
    IEnv,
    Injector
} from "appolo-engine";
import {Context, namespace} from "appolo-context";

import {ModuleFn} from "appolo-engine/lib/modules/modules";
import {Launcher} from "./launcher/launcher";
import {Route} from "./routes/route";
import {IController} from "./controller/IController";
import {Controller} from "./controller/controller";
import {StaticController} from "./controller/staticController";
import {IResponse} from "./interfaces/IResponse";
import {MiddlewareHandlerParams} from "appolo-agent/lib/types";
import {IRequest} from "./interfaces/IRequest";
import {NextFn} from "appolo-agent/index";
import {RequestContextSymbol} from "./interfaces/IMiddleware";
import * as Events from "events";

export class App extends EventDispatcher implements IViewApp, IEngineApp {

    private _launcher: Launcher;

    constructor(options: IOptions) {
        super();

        this._launcher = new Launcher(options);

        this.injector.addObject("app", this, true);


        this._launcher.agent.requestApp = this;
    }

    public static create(options: IOptions): App {
        return new App(options);
    };

    render(path: string | string[], params?: any, res?: IResponse): Promise<string> {

        if (!res) {
            return this._launcher.agent.render(path, params);
        }

        if (!path) {
            path = _path.resolve(this._launcher.options.root, "src/controllers", res.req.route.controllerName, res.req.route.actionName);
        }
        let paths = _.isArray(path) ? path : [path];

        if (_.isString(path)) {
            paths.push(_path.resolve(this._launcher.options.root, "src/controllers", res.req.route.controllerName, path))
        }
        return this._launcher.agent.render(paths, params)
    }

    public async launch(): Promise<App> {

        await this._launcher.launch();


        return this;
    }

    public get options(): IOptions {
        return this._launcher.options
    }

    public enableContext(contextCtr?: typeof Context) {

        let context = namespace.create(RequestContextSymbol, contextCtr);

        this.injector.addObject("context", context);

        context.initialize();

        this.use((req: IRequest, res: IResponse, next: NextFn) => context.scope(next))
    }

    public getContext() {
        return namespace.get(RequestContextSymbol);
    }


    public use(fn: MiddlewareHandler | MiddlewareHandlerAny): this {
        this._launcher.agent.use(fn);

        return this;
    }

    public module(...moduleFn: ModuleFn[]): Promise<any> {
        return this._launcher.engine.module(...moduleFn)
    }

    public viewEngine(fn: (path: string, options?: { cache?: boolean, [otherOptions: string]: any }) => Promise<string>, ext: string = "html", cache: boolean = true): void {
        this._launcher.options.viewEngine = fn;
        this._launcher.options.viewExt = ext;
        this._launcher.options.viewCache = cache;
    }

    public set(name: keyof IOptions, value: any) {
        this._launcher.options[name] = value;
    }

    public async reset() {
        namespace.delete(RequestContextSymbol)
        await this._launcher.reset();
    }

    public register(id: string | IClass, type?: IClass): Define {
        return this._launcher.engine.register(id, type)
    }

    public get injector(): Injector {
        return this._launcher.engine.injector;
    }

    public get container(): Injector {
        return this._launcher.engine.injector;
    }

    public get env(): IEnv {
        return this._launcher.engine.env;
    }

    public get environment(): IEnv {
        return this._launcher.engine.env;
    }

    public route<T extends IController>(controller: string | typeof Controller | typeof StaticController): Route<T> {
        let route = new Route(controller);

        this._launcher.router.addRoute(route);

        return route
    }

    get parent(): IEngineApp {
        return this._launcher.engine.parent;
    }

    public get children(): IEngineApp[] {
        return this._launcher.engine.children;
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

    public on(event: Events | string, fn: (...args: any[]) => any, scope?: any, once?: boolean): void {
        event in EngineEvents
            ? this._launcher.engine.on(event, fn, scope, once)
            : super.on(event.toString(), fn, scope, once)
        
    }

    public once(event: Events | string, fn?: (...args: any[]) => any, scope?: any): Promise<any> | void {
        if (event in EngineEvents) {
            this._launcher.engine.once(event, fn, scope)
        } else {
            super.once(event.toString(), fn, scope)
        }
    }
}
