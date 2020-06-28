"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const index_1 = require("appolo-agent/index");
class Controller {
    constructor(req, res, route) {
        this.req = req;
        this.res = res;
        this.route = route;
    }
    send(statusCode, data) {
        if (arguments.length === 1) {
            this.sendOk(arguments[0]);
        }
        else {
            this.res.status(statusCode).json(data);
        }
    }
    sendOk(data) {
        this.res.status(200).json(data);
    }
    sendCreated(data) {
        this.res.status(201).send(data);
    }
    sendNoContent() {
        this.res.status(204).send();
    }
    sendError(error, code, data) {
        throw new index_1.InternalServerError(error, data, code);
    }
    sendBadRequest(error, code, data) {
        throw new index_1.BadRequestError(error, data, code);
    }
    sendUnauthorized(error, code, data) {
        throw new index_1.UnauthorizedError(error, data, code);
    }
    sendNotFound(error, code, data) {
        throw new index_1.NotFoundError(error, data, code);
    }
    getModel() {
        return this.req.model;
    }
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map