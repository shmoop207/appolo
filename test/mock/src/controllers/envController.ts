"use strict";
import {controller,Controller} from '../../../../index';


@controller()
export class EnvController extends Controller {

    test(req, res) {
        res.json({working: true, controllerName: this.route.controller})
    }

}


