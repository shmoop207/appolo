"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("appolo-agent/index");
const joi = require("joi");
const _ = require("lodash");
function checkValidationMiddleware(req, res, next) {
    let data = _.extend({}, req.params, req.query, req.body);
    joi.validate(data, req.route.validations, req.app.options.validatorOptions, function (e, params) {
        if (e) {
            return next(new index_1.BadRequestError(e.toString()));
        }
        req.model = params;
        next();
    });
}
exports.checkValidationMiddleware = checkValidationMiddleware;
//# sourceMappingURL=checkValidationMiddleware.js.map