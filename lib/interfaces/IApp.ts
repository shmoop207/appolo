import {IApp as IEngineApp, IEnv, IClass} from "@appolo/engine";
import {IOptions} from "./IOptions";
import {
    Hooks,
    MiddlewareHandler,
    MiddlewareHandlerAny,
    MiddlewareHandlerErrorOrAny,
    MiddlewareHandlerOrAny, MiddlewareHandlerParams
} from "@appolo/agent";
import {Route} from "../route/route";
import {Events} from "../events/events";


export interface IApp extends IEngineApp {
    options: IOptions


    set(name: keyof IOptions, value: any)

    environment: IEnv

    route:Route
    event:Events


}
