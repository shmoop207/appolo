import {IRequest} from "../interfaces/IRequest";
import {HttpError, InternalServerError, IResponse, NextFn} from "appolo-agent/index";
import {StaticController} from "../controller/staticController";
import    _ = require('lodash');

export function invokeActionMiddleware(req: IRequest, res: IResponse, next: NextFn) {

    let route = req.route;

    let controller: StaticController = req.app.injector.getObject<StaticController>(route.controller, [req, res, route]);

    if (!controller) {
        next(new HttpError(500, `failed to find controller ${route.controller}`));
        return;
    }

    let fnName: string = route.actionName;

    if (!fnName) {
        fnName = _.isString(route.action) ? route.action : route.action(controller).name;

        if (!controller[fnName]) {
            next(new HttpError(500, `failed to invoke ${this.constructor.name} fnName ${fnName}`));
            return;
        }

        route.actionName = fnName;
    }


    try {
        let result = controller[fnName](req, res, req.model, route);

        if (res.headersSent || res.sending) {
            return;
        }

        if (!result || !(result.then && result.catch)) {
            return res.send(result)
        }

        result
            .then(data => !res.headersSent && res.send(data))
            .catch(e => next(_handleError(e, res)));

    } catch (e) {
        next(_handleError(e, res))
    }
}

function _handleError(e: Error, res: IResponse): HttpError {


    if (e instanceof HttpError) {

        e.message = e.message || "Internal Server Error"

    } else {
        e = new InternalServerError();
    }

    return e as HttpError;
}