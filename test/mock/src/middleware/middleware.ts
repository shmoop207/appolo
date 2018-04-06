"use strict";
import {define, inject, singleton, lazy,Middleware} from '../../../../index';
import {Manager} from "../manager/manager";


@define()
export class TestMiddleware extends Middleware {
    @inject() manager: Manager;

    run(req, res, next) {
        res.send({working: true, middleware: true, name: this.manager.name})
    }
}
