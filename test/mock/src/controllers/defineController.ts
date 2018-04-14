"use strict";
import {controller, inject,Controller} from '../../../../index';
import {Manager5} from "../manager/manager5";

@controller()
export class DefineController extends Controller {

    @inject() manager5: Manager5;

    test(req, res) {
        res.json({working: true, controllerName: this.route.controller, model: req.model, manager5: this.manager5.name})
    }
}




