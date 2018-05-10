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
        let result = controller[fnName](req, res, req.model, route);
        if (res.headersSent || res.sending) {
            return;
        }
        if (!result || !(result.then && result.catch)) {
            return res.send(result);
        }
        result
            .then(data => !res.headersSent && res.send(data))
            .catch(e => next(_handleError(e, res)));
    }
    catch (e) {
        next(_handleError(e, res));
    }
}
exports.invokeActionMiddleware = invokeActionMiddleware;
function _handleError(e, res) {
    if (e instanceof index_1.HttpError) {
        e.message = e.message || "Internal Server Error";
    }
    else {
        e = new index_1.InternalServerError();
    }
    return e;
}
//# sourceMappingURL=invokeActionMiddleware.js.map