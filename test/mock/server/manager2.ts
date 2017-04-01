"use strict";
import appolo = require('../../../index');
import {Manager} from "./manager";
 class Manager2 extends appolo.EventDispatcher {

    static get $config() {
        return {
            id: 'manager2',
            singleton: true,
            inject: ['manager']
        }
    }

    manager: Manager

    constructor() {


        super();
    }

    run() {
        return this.manager.run()

    }
}

export  = Manager2;
