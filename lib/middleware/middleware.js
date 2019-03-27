"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_agent_1 = require("appolo-agent");
class Middleware {
    constructor(req, res, next, route) {
        this.req = req;
        this.res = res;
        this.next = next;
        this.route = route;
    }
    run(req, res, next, route) {
        next();
    }
    catch(err, req, res, next, route) {
        next(err);
    }
    runWithData(data, req, res, next, route) {
        next(null, data);
    }
    sendError(error, code) {
        this._callNext(new appolo_agent_1.InternalServerError(error, {}, code));
    }
    sendBadRequest(error, code) {
        this._callNext(new appolo_agent_1.BadRequestError(error, {}, code));
    }
    sendUnauthorized(error, code) {
        this._callNext(new appolo_agent_1.UnauthorizedError(error, {}, code));
    }
    sendNotFound(error, code) {
        this._callNext(new appolo_agent_1.NotFoundError(error, {}, code));
    }
    _callNext(e) {
        this.next(e);
    }
}
exports.Middleware = Middleware;
//# sourceMappingURL=middleware.js.map