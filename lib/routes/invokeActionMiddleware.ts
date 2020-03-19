import {IRequest} from "../interfaces/IRequest";
import {IResponse} from "../interfaces/IResponse";
import {HttpError, InternalServerError, NextFn} from "appolo-agent/index";
import {StaticController} from "../controller/staticController";
import {IMiddleware} from "../interfaces/IMiddleware";
import {Strings} from 'appolo-utils';

export function invokeActionMiddleware(req: IRequest, res: IResponse, next: NextFn) {

    let route = req.route;

    let controller: StaticController = req.app.injector.getObject<StaticController>(route.controller, [req, res, route]);

    if (!controller) {
        next(new HttpError(500, `failed to find controller ${route.controller}`));
        return;
    }

    let fnName: string = route.actionName;

    if (!fnName) {
        fnName = Strings.isString(route.action) ? route.action : (route.action as Function)(controller).name;

        if (!controller[fnName]) {
            next(new HttpError(500, `failed to invoke ${this.constructor.name} fnName ${fnName}`));
            return;
        }

        route.actionName = fnName;
    }


    try {


        let result;

        if (route.customRouteParam.length) {
            let args = [req, res, req.model, route];
            for (let i = 0, len = route.customRouteParam.length; i < len; i++) {
                let data = route.customRouteParam[i];
                args.splice(data.index, 0, data.fn(req, res, req.route));
            }

            result = controller[fnName].apply(controller, args);
        } else {
            result = controller[fnName](req, res, req.model, route);
        }


        if (res.headersSent || res.sending) {
            return;
        }

        if (result && result.then && result.catch) {

            result
                .then(data => (!res.headersSent && !res.sending) && res.send(data))
                .catch(e => next(_handleError(e)));

            return;
        }

        res.send(result)


    } catch (e) {
        next(_handleError(e))
    }
}

function _handleError(e: Error): HttpError {


    if (e instanceof HttpError) {

        e.message = e.message || "Internal Server Error"

    } else {
        e = new InternalServerError();
    }

    return e as HttpError;
}

export function invokeMiddleWare(middlewareId: string) {

    return function (req: IRequest, res: IResponse, next: NextFn) {
        let middleware: IMiddleware = req.app.injector.getObject<IMiddleware>(middlewareId, [req, res, next, req.route]);

        if (!middleware) {
            return next(new HttpError(500, `failed to find middleware ${middlewareId}`));
        }

        let result = middleware.run(req, res, next, req.route);

        if (res.headersSent || res.sending || middleware.run.length > 2) {
            return;
        }

        if (!result || !result.then || !result.catch) {
            return next();
        }

        result.then(() => (!res.headersSent && !res.sending) && next())
            .catch(e => next(_handleError(e)));


    }

}

export function invokeMiddleWareError(middlewareId: string) {
    return function (err: any, req: IRequest, res: IResponse, next: NextFn) {
        let middleware: IMiddleware = req.app.injector.getObject<IMiddleware>(middlewareId, [req, res, next, req.route]);

        if (!middleware) {
            return next(new HttpError(500, `failed to find middleware ${middlewareId}`));
        }

        let result = middleware.catch(err, req, res, next, req.route);

        if (res.headersSent || res.sending || middleware.catch.length > 3) {
            return;
        }

        if (!result || !result.then || !result.catch) {
            return next(err);
        }

        result.then(() => (!res.headersSent && !res.sending) && next(err))
            .catch(e => next(_handleError(e)));


    }

}

export function invokeMiddleWareData(middlewareId: string) {
    return function (data: any, req: IRequest, res: IResponse, next: NextFn) {
        let middleware: IMiddleware = req.app.injector.getObject<IMiddleware>(middlewareId, [req, res, next, req.route]);

        if (!middleware) {
            return next(new HttpError(500, `failed to find middleware ${middlewareId}`));
        }

        let result = middleware.catch(data, req, res, next, req.route);

        if (res.headersSent || res.sending || middleware.catch.length > 3) {
            return;
        }

        if (!result || !result.then || !result.catch) {
            return next(null, data);
        }

        result.then((data) => (!res.headersSent && !res.sending) && next(null, data))
            .catch(e => next(_handleError(e)));


    }

}

export function invokeCustomRouteMiddleWare(req: IRequest, res: IResponse, next: NextFn) {

    let route = req.route;

    if (route.gzip) {
        res.gzip();
    }

    if (route.headers.length) {
        for (let i = 0, len = route.headers.length; i < len; i++) {
            let header = route.headers[i];
            res.setHeader(header.key, header.value);
        }
    }

    if (route.customRouteFn.length) {
        for (let i = 0, len = route.customRouteFn.length; i < len; i++) {
            let fn = route.customRouteFn[i];
            fn(req, res, req.route)
        }
    }

    if (route.statusCode) {
        res.status(route.statusCode);
    }

    next();


}
