import {IOptions} from "./lib/interfaces/IOptions";
import * as validator from 'joi';

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
    define,singleton,
    EventDispatcher,
    Util,
    lazy,
    module,
    IEnv,
    IBootstrap,
    IFactory,
    Injector,bootstrap
} from 'appolo-engine';
export { Route} from './lib/routes/route';
export {Controller} from './lib/controller/controller';
export {StaticController} from './lib/controller/staticController';
export * from './lib/decorators/decorators'

export {Middleware} from './lib/middleware/middleware';
export {StaticMiddleware} from './lib/middleware/staticMiddleware';
//export {default as router, Router} from './lib/routes/router';
//export {Methods} from 'appolo-agent'
//export {HttpError} from './lib/common/error/httpError'

//export {default as launcher} from './lib/launcher/launcher';
export {App} from './lib/app';


export {validator}
import {App} from "./lib/app";


export {IOptions} from "./lib/interfaces/IOptions";
export {IRouteOptions} from "./lib/interfaces/IRouteOptions";
export {RouteModel} from "./lib/routes/routeModel";
export {IRequest, IResponse, NextFn,MiddlewareHandlerParams,Methods} from "appolo-agent";

export function createApp(options?: IOptions): App {
    return new App(options)
}

export default function (options?: IOptions): App {
    return new App(options)
};



