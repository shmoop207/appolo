import {IApp as IEngineApp,IEnv,IClass} from "@appolo/engine";
import {IOptions} from "./IOptions";
import {
    Hooks,
    MiddlewareHandler,
    MiddlewareHandlerAny,
    MiddlewareHandlerErrorOrAny,
    MiddlewareHandlerOrAny,MiddlewareHandlerParams
} from "@appolo/agent";
import {Define, Injector} from "@appolo/inject";
import {IController,Controller,StaticController,IMiddlewareCtr,Route} from "@appolo/route";
import    http = require('http');
import    https = require('https');
import {ModuleArg} from "@appolo/engine";

export interface IApp extends IEngineApp {
    options: IOptions

    parent: IApp
    root: IApp

    use(fn: MiddlewareHandler | MiddlewareHandlerAny): this

    module(...modules: ModuleArg[]): Promise<void>

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


    addHook(name: Hooks.OnError, ...hook: (string | MiddlewareHandlerErrorOrAny | IMiddlewareCtr)[]): this

    addHook(name: Hooks.OnResponse | Hooks.PreMiddleware | Hooks.PreHandler | Hooks.OnRequest, ...hook: (string | MiddlewareHandlerErrorOrAny | IMiddlewareCtr)[]): this

    addHook(name: Hooks.OnSend, ...hook: (string | MiddlewareHandlerOrAny | IMiddlewareCtr)[]): this

    addHook(name: Hooks, ...hooks: (string | MiddlewareHandlerParams | IMiddlewareCtr)[]): this
}
