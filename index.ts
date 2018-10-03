import {IOptions} from "./lib/interfaces/IOptions";
import * as validator from 'joi';
import {App} from "./lib/app";
import {Context} from "appolo-context";
import {IRequest} from "./lib/interfaces/IRequest";
import {
    BadRequestError,
    HttpError,
    InternalServerError,
    IResponse,
    Methods,
    MiddlewareHandlerParams,
    NextFn,
    NotFoundError,
    UnauthorizedError
} from "appolo-agent";
import {
    alias,
    aliasFactory,
    bind,
    bootstrap,
    cache,
    debounce,
    define,
    delay,
    EventDispatcher,
    factory,
    IApp,
    IBootstrap,
    IEnv,
    IFactory,
    IModuleOptions,
    initMethod,
    inject,
    injectAlias,
    injectAliasFactory,
    injectArray,
    injectDictionary,
    injectFactory,
    injectFactoryMethod,
    injectObjectProperty,
    Injector,
    injectParam,
    injectValue,
    interval,
    IParamInject,
    lazy,
    mixins,
    module,
    Module,
    once,
    override,
    singleton,
    throttle,
    Util
} from 'appolo-engine';

export {
    factory,
    inject,
    initMethod,
    injectParam,
    injectFactory,
    injectFactoryMethod,
    alias,
    aliasFactory,
    injectValue,
    injectObjectProperty,
    injectDictionary,
    injectArray,
    injectAlias,
    injectAliasFactory,
    IParamInject,
    define, singleton,
    EventDispatcher,
    Util,
    lazy,
    module, Module,
    IEnv,
    IBootstrap,
    IFactory,
    Injector, bootstrap, override,
    IApp, mixins, bind, delay, debounce, interval, throttle, once, cache, IModuleOptions
}
export {Route} from './lib/routes/route';
export {Controller} from './lib/controller/controller';
export {StaticController} from './lib/controller/staticController';
export * from './lib/decorators/decorators'

export {Context}
export {Middleware} from './lib/middleware/middleware';
export {StaticMiddleware} from './lib/middleware/staticMiddleware';
export {App} from './lib/app';


export {validator}


export {IOptions} from "./lib/interfaces/IOptions";
export {IRequest} from "./lib/interfaces/IRequest";
export {IRouteOptions} from "./lib/interfaces/IRouteOptions";
export {RouteModel} from "./lib/routes/routeModel";
export {
    IResponse,
    NextFn,
    MiddlewareHandlerParams,
    Methods,
    HttpError,
    BadRequestError,
    InternalServerError,
    NotFoundError,
    UnauthorizedError
}

export function createApp(options?: IOptions): App {
    return new App(options)
}

export default function (options?: IOptions): App {
    return new App(options)
};



