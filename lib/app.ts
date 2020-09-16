import    http = require('http');
import    https = require('https');
import {IOptions} from "./interfaces/IOptions";
import {
    Events as AgentEvents,
    Hooks,
    Methods,
    IApp as IAgentApp,
    MiddlewareHandlerErrorOrAny,
    MiddlewareHandlerOrAny, MiddlewareHandlerParams
} from "@appolo/agent";
import {Events as EngineEvents, IApp as IEngineApp, IClass, IEnv} from "@appolo/engine";
import {Route, IController, Controller, StaticController, IMiddlewareCtr} from "@appolo/route";

import {Injector, Define} from "@appolo/inject";

import {Launcher} from "./launcher/launcher";
import {Events} from "./interfaces/events";
import {EventDispatcher} from "@appolo/events";
import {ModuleArg} from "@appolo/engine";
import {Discovery} from "./discovery/discovery";

export class App extends EventDispatcher implements IAgentApp, IEngineApp {

    private _launcher: Launcher;
    private _discovery: Discovery;


    constructor(options: IOptions) {
        super();


        this._launcher = new Launcher(options, this);

        this._discovery = new Discovery(this, this._launcher.engine.discovery)

        this.injector.addObject("app", this, true);


        this._launcher.agent.requestApp = this;
    }

    public static create(options: IOptions): App {
        return new App(options);
    };

    public get discovery(): Discovery {
        return this._discovery;
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


    public use(path?: (string | MiddlewareHandlerOrAny | IMiddlewareCtr), ...middleware: (MiddlewareHandlerOrAny | IMiddlewareCtr)[]): this {

        this._launcher.router.addMiddleware(path, middleware, false);
        return this;
    }

    public error(path?: (string | MiddlewareHandlerErrorOrAny | IMiddlewareCtr), ...middleware: (string | MiddlewareHandlerErrorOrAny | IMiddlewareCtr)[]): this {

        this._launcher.router.addMiddleware(path, middleware, true);
        return this;
    }


    public addHook(name: Hooks.OnError, ...hook: (string | MiddlewareHandlerErrorOrAny | IMiddlewareCtr)[]): this
    public addHook(name: Hooks.OnResponse | Hooks.PreMiddleware | Hooks.PreHandler | Hooks.OnRequest, ...hook: (string | MiddlewareHandlerErrorOrAny | IMiddlewareCtr)[]): this
    public addHook(name: Hooks.OnSend, ...hook: (string | MiddlewareHandlerOrAny | IMiddlewareCtr)[]): this
    public addHook(name: Hooks, ...hooks: (string | MiddlewareHandlerParams | IMiddlewareCtr)[]): this {

        this._launcher.router.addHook(name as any, ...(hooks as any));

        return this
    }

    public async module(...modules: ModuleArg[]): Promise<void> {
        return this._launcher.engine.module(...modules)
    }

    public moduleAt(index: number): App {
        return this.children[index]
    }


    public set(name: keyof IOptions, value: any) {
        this._launcher.options[name as any] = value;
    }

    public async reset() {
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

    public addRouteFromClass(klass: typeof Controller) {
        this._launcher.router.addRouteFromClass(klass)
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

}
