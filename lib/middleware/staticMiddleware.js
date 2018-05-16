"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("appolo-agent/index");
class StaticMiddleware {
    getModel(req) {
        return (req).model;
    }
    sendError(next, error, code) {
        this._callNext(next, new index_1.InternalServerError(error, {}, code));
    }
    sendBadRequest(next, error, code, data) {
        this._callNext(next, new index_1.BadRequestError(error, data, code));
    }
    sendUnauthorized(next, error, code, data) {
        this._callNext(next, new index_1.UnauthorizedError(error, data, code));
    }
    sendNotFound(next, error, code, data) {
        this._callNext(next, new index_1.NotFoundError(error, data, code));
    }
    _callNext(next, e) {
        next(e);
    }
}
exports.StaticMiddleware = StaticMiddleware;
//# sourceMappingURL=staticMiddleware.js.map