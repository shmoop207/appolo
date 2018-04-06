"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    sendError(error, code) {
        this.res.status(500).json({
            status: 500,
            statusText: "Internal Server Error",
            error: error ? error.toString() : "",
            code: code
        });
    }
    sendBadRequest(error, code) {
        this.res.status(400).json({
            status: 400,
            statusText: "Bad Request",
            error: (error instanceof Error) ? error.toString() : "",
            code: code
        });
    }
    sendUnauthorized(error, code) {
        this.res.status(401).json({
            status: 401,
            statusText: "Unauthorized",
            error: error ? error.toString() : "",
            code: code
        });
    }
    sendNotFound(error, code) {
        this.res.status(404).json({
            status: 404,
            statusText: "Not Found",
            error: error ? error.toString() : "",
            code: code
        });
    }
    getModel() {
        return this.req.model;
    }
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map