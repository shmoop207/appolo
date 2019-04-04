import {IApp as IEngineApp} from "appolo-engine";
import {IOptions} from "./IOptions";
import {Context} from "appolo-context/index";
import {
    Hooks,
    MiddlewareHandler,
    MiddlewareHandlerAny,
    MiddlewareHandlerErrorOrAny,
    MiddlewareHandlerOrAny
} from "appolo-agent/index";
import {ModuleFn} from "appolo-engine/lib/modules/modules";
import {Define, IClass, IEnv, Injector} from "appolo-engine/index";
import {IController} from "../controller/IController";
import {Controller} from "../controller/controller";
import {StaticController} from "../controller/staticController";
import {Route} from "../routes/route";
import {MiddlewareHandlerParams} from "appolo-agent/lib/types";
import {Events} from "./events";
import    http = require('http');
import    https = require('https');
import {IMiddlewareCtr} from "./IMiddleware";

export interface IApp extends IEngineApp {
    options: IOptions

    enableContext(contextCtr?: typeof Context)
    parent: IApp
    root: IApp
    getContext(): any

    use(fn: MiddlewareHandler | MiddlewareHandlerAny): this

    module(...moduleFn: ModuleFn[]): Promise<any>

    viewEngine(fn: (path: string, options?: { cache?: boolean, [otherOptions: string]: any }) => Promise<string>, ext: string, cache: boolean): void

    set(name: keyof IOptions, value: any)

    reset(): Promise<void>

    register(id: string | IClass, type?: IClass): Define

    injector: Injector
    container: Injector
    env: IEnv
    environment: IEnv

    route<T extends IController>(controller: string | typeof Controller | typeof StaticController): Route<T>

    get(path: string, ...handler: MiddlewareHandlerParams[]): this

    post(path: string, ...handler: MiddlewareHandlerParams[]): this

    delete(path: string, ...handler: MiddlewareHandlerParams[]): this

    patch(path: string, ...handler: MiddlewareHandlerParams[]): this

    server: http.Server | https.Server

    handle(request: http.IncomingMessage, response: http.ServerResponse)

    on(event: Events | string, fn: (...args: any[]) => any, scope?: any): void

    once(event: Events | string, fn?: (...args: any[]) => any, scope?: any): Promise<any> | void

    exportedClasses: { fn: Function, path: string }[]

    addHook(name: Hooks.OnError, ...hook: (string | MiddlewareHandlerErrorOrAny | IMiddlewareCtr)[]): this

    addHook(name: Hooks.OnResponse | Hooks.PreMiddleware | Hooks.PreHandler | Hooks.OnRequest, ...hook: (string | MiddlewareHandlerErrorOrAny | IMiddlewareCtr)[]): this

    addHook(name: Hooks.OnSend, ...hook: (string | MiddlewareHandlerOrAny | IMiddlewareCtr)[]): this

    addHook(name: Hooks, ...hooks: (string | MiddlewareHandlerParams | IMiddlewareCtr)[]): this
}
