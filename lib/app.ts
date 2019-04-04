import    http = require('http');
import    https = require('https');
import    _ = require('lodash');
import {IOptions} from "./interfaces/IOptions";
import {
    Events as AgentEvents, Hooks, Methods,
    IApp as IAgentApp,
    MiddlewareHandlerErrorOrAny,
    MiddlewareHandlerOrAny
} from "appolo-agent";
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
import {IMiddlewareCtr, MiddlewareType, RequestContextSymbol} from "./interfaces/IMiddleware";
import {Events} from "./interfaces/events";
import {Plugin} from "./interfaces/IDefinition";
import {Util} from "./util/util";
import {invokeMiddleWare, invokeMiddleWareError} from "./routes/invokeActionMiddleware";
import {RouterDefinitionsSymbol} from "./decorators/decorators";

export class App extends EventDispatcher implements IAgentApp, IEngineApp {

    private _launcher: Launcher;

    constructor(options: IOptions) {
        super();

        this._launcher = new Launcher(options, this);

        this.injector.addObject("app", this, true);


        this._launcher.agent.requestApp = this;
    }

    public static create(options: IOptions): App {
        return new App(options);
    };

    public get exportedClasses(): { fn: Function, path: string, define: Define }[] {
        return this.exported
    }

    public get exported(): { fn: Function, path: string, define: Define }[] {
        return this._launcher.engine.exportedClasses;
    }

    public getRoute<T extends IController>(path: string, method: Methods): Route<T> {
        return this._launcher.router.getRoute(path, method)
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


    public use(...middleware: (string | MiddlewareHandlerOrAny | IMiddlewareCtr)[]): this {

        return this._addMiddleware(middleware, false)
    }

    public error(...middleware: (string | MiddlewareHandlerErrorOrAny | IMiddlewareCtr)[]): this {

        return this._addMiddleware(middleware, true)
    }

    private _addMiddleware(middleware: (string | MiddlewareHandlerErrorOrAny | MiddlewareHandlerOrAny | IMiddlewareCtr)[], error: boolean): this {

        for (let i = 0; i < middleware.length; i++) {
            let id = Util.getClassId(middleware[i]);

            if (id) {
                middleware[i] = error ? invokeMiddleWareError(id) : invokeMiddleWare(id)
            }
        }

        if (error) {
            this._launcher.agent.error(...middleware as MiddlewareHandlerErrorOrAny[]);

        } else {
            this._launcher.agent.use(...middleware as MiddlewareHandlerErrorOrAny[]);

        }

        return this;
    }

    public addHook(name: Hooks.OnError, ...hook: (string | MiddlewareHandlerErrorOrAny | IMiddlewareCtr)[]): this
    public addHook(name: Hooks.OnResponse | Hooks.PreMiddleware | Hooks.PreHandler | Hooks.OnRequest, ...hook: (string | MiddlewareHandlerErrorOrAny | IMiddlewareCtr)[]): this
    public addHook(name: Hooks.OnSend, ...hook: (string | MiddlewareHandlerOrAny | IMiddlewareCtr)[]): this
    public addHook(name: Hooks, ...hooks: (string | MiddlewareHandlerParams | IMiddlewareCtr)[]): this {

        hooks = Util.convertMiddlewareHooks(name, hooks);

        this._launcher.agent.addHook(name as any, ...(hooks as any));

        return this
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
        namespace.delete(RequestContextSymbol);
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

    public get parent(): App {
        return this._launcher.engine.parent as App;
    }

    public get root(): App {
        return this._launcher.engine.root as App;
    }

    public get children(): App[] {
        return this._launcher.engine.children as App[];
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

    public on(event: Events | string, fn: (...args: any[]) => any, scope?: any): void {
        if (event in EngineEvents) {
            this._launcher.engine.on(event as EngineEvents, fn, scope)
        } else if (event in AgentEvents) {
            this._launcher.agent.on(event as AgentEvents, fn, scope)
        } else {
            super.on(event.toString(), fn, scope)
        }

    }

    public once(event: Events | string, fn?: (...args: any[]) => any, scope?: any): Promise<any> | void {
        if (event in EngineEvents) {
            this._launcher.engine.once(event as EngineEvents, fn, scope)
        } else if (event in AgentEvents) {
            this._launcher.agent.once(event as AgentEvents, fn, scope)
        } else {
            super.once(event.toString(), fn, scope)
        }
    }

    public plugin(plugin: Plugin, options: any) {
        this._launcher.plugin(plugin, options);
    }
}
