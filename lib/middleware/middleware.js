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
        this._callNext(403, "Unauthorized", error, code);
    }
    sendNotFound(error, code) {
        this._callNext(404, "Not Found", error, code);
    }
    _callNext(status, statusText, error, code) {
        this.next(new appolo_agent_1.HttpError(status, statusText, {
            status: status,
            statusText: statusText,
            error: error.message,
            code: code
        }));
    }
}
exports.Middleware = Middleware;
//# sourceMappingURL=middleware.js.map