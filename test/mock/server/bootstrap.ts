"use strict";
import appolo = require('../../../index');
import {IBootstrap} from "../../../lib/IBootstrap";
import {Manager} from "./manager";


export class Bootstrap extends appolo.EventDispatcher implements IBootstrap{

    working:boolean;
    manager:Manager
    constructor() {
        super();
    }

    run(callback) {


        this.working = true;

        callback();
    }
}

appolo.define('appolo-bootstrap',Bootstrap)
    .singleton()
    .inject("manager");