"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_agent_1 = require("appolo-agent");
class StaticMiddleware {
    getModel(req) {
        return (req).model;
    }
    sendError(next, error, code) {
        this._callNext(next, 500, "Internal Server Error", error, code);
    }
    sendBadRequest(next, error, code) {
        this._callNext(next, 400, "Bad Request", error, code);
    }
    sendUnauthorized(next, error, code) {
        this._callNext(next, 403, "Unauthorized", error, code);
    }
    sendNotFound(next, error, code) {
        this._callNext(next, 404, "Not Found", error, code);
    }
    _callNext(next, status, statusText, error, code) {
        next(new appolo_agent_1.HttpError(status, statusText, {
            status: status,
            statusText: statusText,
            error: error && error.message,
            code: code
        }));
    }
}
exports.StaticMiddleware = StaticMiddleware;
//# sourceMappingURL=staticMiddleware.js.map