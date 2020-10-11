"use strict";
import {Middleware} from '@appolo/route';
import {Manager} from "../manager/manager";

import { inject,define,singleton,override,lazy} from '@appolo/inject';

@define()
export class TestMiddleware extends Middleware {
    @inject() manager: Manager;

    run(req, res, next) {
        res.send({working: true, middleware: true, name: this.manager.name})
    }
}
