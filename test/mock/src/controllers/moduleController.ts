"use strict";
import {define,Controller,inject,pathGet} from "../../../../index";


@define()
export class ModuleController extends Controller {
    @inject() logger2: any;
    @inject() logger3: any;

    @pathGet("/test/module/")
    test(req, res) {
        res.json({
            working: true,
            controllerName: this.route.controller,
            logger: this.logger2.getName() + this.logger3.getName()
        })
    }

}


