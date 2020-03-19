import {MiddlewareHandler, MiddlewareHandlerAny} from "appolo-agent/index";
import {IOptions} from "./lib/interfaces/IOptions";
import {ModuleFn} from "appolo-engine/lib/modules/modules";
import {Define, IClass, IEnv, Injector} from "appolo-engine/index";
import {IController} from "./lib/controller/IController";
import {Controller} from "./lib/controller/controller";
import {StaticController} from "./lib/controller/staticController";
import {Route} from "./lib/routes/route";
import {MiddlewareHandlerParams} from "appolo-agent/lib/types";
import {Events} from "./lib/interfaces/events";
import    http = require('http');
import    https = require('https');

declare module "appolo-engine" {
    export interface IApp {
        options: IOptions

        env: IEnv
        injector: Injector

        reset()

        parent: IApp
        root: IApp
        children: IApp[]

        launch(): Promise<IApp>

        //exportedClasses: { fn: Function, path: string }[]

        //getContext(): any

        use(fn: MiddlewareHandler | MiddlewareHandlerAny): this

        module(...moduleFn: ModuleFn[]): Promise<any>

        viewEngine(fn: (path: string, options?: { cache?: boolean, [otherOptions: string]: any }) => Promise<string>, ext: string, cache: boolean): void

        set(name: keyof IOptions, value: any)

        reset(): Promise<void>

        register(id: string | IClass, type?: IClass): Define

        container: Injector
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
    }
}
