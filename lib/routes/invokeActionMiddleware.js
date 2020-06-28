"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeCustomRouteMiddleWare = exports.invokeMiddleWareData = exports.invokeMiddleWareError = exports.invokeMiddleWare = exports.invokeActionMiddleware = void 0;
const index_1 = require("appolo-agent/index");
const appolo_utils_1 = require("appolo-utils");
function invokeActionMiddleware(req, res, next) {
    let route = req.route;
    let controller = req.app.injector.getObject(route.controller, [req, res, route]);
    if (!controller) {
        next(new index_1.HttpError(500, `failed to find controller ${route.controller}`));
        return;
    }
    let fnName = route.actionName;
    if (!fnName) {
        fnName = appolo_utils_1.Strings.isString(route.action) ? route.action : route.action(controller).name;
        if (!controller[fnName]) {
            next(new index_1.HttpError(500, `failed to invoke ${this.constructor.name} fnName ${fnName}`));
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
        }
        else {
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
        res.send(result);
    }
    catch (e) {
        next(_handleError(e));
    }
}
exports.invokeActionMiddleware = invokeActionMiddleware;
function _handleError(e) {
    if (e instanceof index_1.HttpError) {
        e.message = e.message || "Internal Server Error";
    }
    else {
        e = new index_1.InternalServerError();
    }
    return e;
}
function invokeMiddleWare(middlewareId) {
    return function (req, res, next) {
        let middleware = req.app.injector.getObject(middlewareId, [req, res, next, req.route]);
        if (!middleware) {
            return next(new index_1.HttpError(500, `failed to find middleware ${middlewareId}`));
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
    };
}
exports.invokeMiddleWare = invokeMiddleWare;
function invokeMiddleWareError(middlewareId) {
    return function (err, req, res, next) {
        let middleware = req.app.injector.getObject(middlewareId, [req, res, next, req.route]);
        if (!middleware) {
            return next(new index_1.HttpError(500, `failed to find middleware ${middlewareId}`));
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
    };
}
exports.invokeMiddleWareError = invokeMiddleWareError;
function invokeMiddleWareData(middlewareId) {
    return function (data, req, res, next) {
        let middleware = req.app.injector.getObject(middlewareId, [req, res, next, req.route]);
        if (!middleware) {
            return next(new index_1.HttpError(500, `failed to find middleware ${middlewareId}`));
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
    };
}
exports.invokeMiddleWareData = invokeMiddleWareData;
function invokeCustomRouteMiddleWare(req, res, next) {
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
            fn(req, res, req.route);
        }
    }
    if (route.statusCode) {
        res.status(route.statusCode);
    }
    next();
}
exports.invokeCustomRouteMiddleWare = invokeCustomRouteMiddleWare;
//# sourceMappingURL=invokeActionMiddleware.js.map