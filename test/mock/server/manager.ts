"use strict";
import appolo = require('../../../index');

export class Manager extends appolo.EventDispatcher {

    working:boolean
    constructor() {
        super();
    }

    run() {


        this.working = true;

        return true;

    }
}


module.exports = appolo.define('manager').type(Manager).singleton();
