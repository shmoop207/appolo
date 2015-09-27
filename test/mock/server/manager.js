"use strict";
var appolo = require('../../../index');

let $config = {
    id: 'manager',
    singleton: true,
};

class Manager extends appolo.EventDispatcher {

    constructor() {
        super();
    }

    run(callback) {


        this.working = true;

        callback();
    }
}

module.exports = appolo.define($config, Manager);
