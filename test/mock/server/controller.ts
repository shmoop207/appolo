"use strict";
import appolo = require('../../../index');
import {Manager} from "./manager";
import {Logger2} from "../config/modules/logger2";


export class Controller extends appolo.EventDispatcher {
    working:boolean;
    manager:Manager;
    logger2:Logger2

    constructor() {
        super();
    }

    run() {

        this.working = true;
    }
}

 appolo.define("controller")
     .type(Controller)
     .inject("manager logger2")

