"use strict";
var appolo = require('../../../index');

let $config = {
    id: 'manager',
    singleton: true
};

class Manager extends appolo.EventDispatcher {

    constructor() {
        super();
    }

    run() {


        this.working = true;


    }
}

module.exports = appolo.define($config, Manager);
