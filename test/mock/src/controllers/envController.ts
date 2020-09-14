"use strict";
import {controller,Controller} from '@appolo/route';


@controller()
export class EnvController extends Controller {

    test(req, res) {
        res.json({working: true, controllerName: this.route.controller})
    }

}


