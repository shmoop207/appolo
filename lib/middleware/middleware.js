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
    sendError(error, code) {
        this._callNext(500, "Internal Server Error", error, code);
    }
    sendBadRequest(error, code) {
        this._callNext(400, "Bad Request", error, code);
    }
    sendUnauthorized(error, code) {
        this._callNext(401, "Unauthorized", error, code);
    }
    sendNotFound(error, code) {
        this._callNext(404, "Not Found", error, code);
    }
    _callNext(status, statusText, error, code) {
        let err = new appolo_agent_1.HttpError(status, statusText, error, {}, code);
        this.next(err);
    }
}
exports.Middleware = Middleware;
//# sourceMappingURL=middleware.js.map