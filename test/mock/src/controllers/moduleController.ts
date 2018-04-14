"use strict";
import {controller,Controller,inject,get} from "../../../../index";


@controller()
export class ModuleController extends Controller {
    @inject() logger2: any;
    @inject() logger3: any;

    @get("/test/module/")
    test(req, res) {
        res.json({
            working: true,
            controllerName: this.route.controller,
            logger: this.logger2.getName() + this.logger3.getName()
        })
    }

}


