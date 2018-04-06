"use strict";
import {define,Controller} from '../../../../index';


@define()
export class EnvController extends Controller {

    test(req, res) {
        res.json({working: true, controllerName: this.route.controller})
    }

}


