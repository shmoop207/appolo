import {IRequest} from "../interfaces/IRequest";
import {BadRequestError, IResponse, NextFn} from "appolo-agent/index";
import    joi = require('joi');
import    _ = require('lodash');


export function checkValidationMiddleware(req: IRequest, res: IResponse, next: NextFn) {
    let data = _.extend({}, req.params, req.query, (req as any).body);

    joi.validate(data, req.route.validations, req.app.options.validatorOptions, function (e, params) {

        if (e) {
            return next(new BadRequestError(e.toString()));

        }

        req.model = params;

        next();
    });
}