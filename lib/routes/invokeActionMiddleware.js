"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("appolo-agent/index");
const _ = require("lodash");
function invokeActionMiddleware(req, res, next) {
    let route = req.route;
    let controller = req.app.injector.getObject(route.controller, [req, res, route]);
    if (!controller) {
        next(new index_1.HttpError(500, `failed to find controller ${route.controller}`));
        return;
    }
    let fnName = route.actionName;
    if (!fnName) {
        fnName = _.isString(route.action) ? route.action : route.action(controller).name;
        if (!controller[fnName]) {
            next(new index_1.HttpError(500, `failed to invoke ${this.constructor.name} fnName ${fnName}`));
            return;
        }
        route.actionName = fnName;
    }
    try {
        if (route.gzip) {
            res.gzip();
        }
        if (route.headers.length) {
            for (let i = 0, len = route.headers.length; i < len; i++) {
                let header = route.headers[i];
                res.setHeader(header.key, header.value);
            }
        }
        if (route.statusCode) {
            res.status(route.statusCode);
        }
        let result = controller[fnName](req, res, req.model, route);
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
            next(new index_1.HttpError(500, `failed to find middleware ${middlewareId}`));
        }
        let result = middleware.run(req, res, next, req.route);
        if (next.run || res.headersSent || res.sending) {
            return;
        }
        if (result && result.then && result.catch) {
            result
                .then(data => (!next.run && !res.headersSent && !res.sending) && next())
                .catch(e => next(_handleError(e)));
            return;
        }
        next();
    };
}
exports.invokeMiddleWare = invokeMiddleWare;
function invokeMiddleWareError(middlewareId) {
    return function (err, req, res, next) {
        let middleware = req.app.injector.getObject(middlewareId, [req, res, next, req.route]);
        if (!middleware) {
            next(new index_1.HttpError(500, `failed to find middleware ${middlewareId}`));
        }
        let result = middleware.catch(err, req, res, next, req.route);
        if (next.run || res.headersSent || res.sending) {
            return;
        }
        if (result && result.then && result.catch) {
            result
                .then(data => (!next.run && !res.headersSent && !res.sending) && next(err))
                .catch(e => next(_handleError(e)));
            return;
        }
        next(err);
    };
}
exports.invokeMiddleWareError = invokeMiddleWareError;
//# sourceMappingURL=invokeActionMiddleware.js.map