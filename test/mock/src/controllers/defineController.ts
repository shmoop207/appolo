"use strict";
import {controller,Controller} from '@appolo/route';
import {Manager5} from "../manager/manager5";
import { inject,define,singleton,override,lazy} from '@appolo/inject';

@controller()
export class DefineController extends Controller {

    @inject() manager5: Manager5;

    test(req, res) {
        res.json({working: true, controllerName: this.route.controller, model: req.query, manager5: this.manager5.name})
    }
}




