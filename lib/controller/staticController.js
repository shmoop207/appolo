"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_agent_1 = require("appolo-agent");
class StaticController {
    send(res, statusCode, data) {
        if (arguments.length === 1) {
            this.sendOk(arguments[0]);
        }
        else {
            res.status(statusCode).json(data);
        }
    }
    sendOk(res, data) {
        res.status(200).json(data);
    }
    sendCreated(res, data) {
        res.status(201).send(data);
    }
    sendNoContent(res) {
        res.status(204).send();
    }
    sendError(res, error, code, data) {
        throw new appolo_agent_1.InternalServerError(error, data, code);
    }
    sendBadRequest(res, error, code, data) {
        throw new appolo_agent_1.BadRequestError(error, data, code);
    }
    sendUnauthorized(res, error, code, data) {
        throw new appolo_agent_1.UnauthorizedError(error, data, code);
    }
    sendNotFound(res, error, code, data) {
        throw new appolo_agent_1.NotFoundError(error, data, code);
    }
    getModel(req) {
        return req.model;
    }
}
exports.StaticController = StaticController;
//# sourceMappingURL=staticController.js.map