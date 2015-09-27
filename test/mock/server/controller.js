"use strict";
var appolo = require('../../../index');

let $config = {
    id: 'controller',
    singleton: true,
    inject: ['manager']
};

class Controller extends appolo.EventDispatcher {

    constructor() {
        super();
    }

    run(callback) {


        this.working = true;

        callback();
    }
}

module.exports = appolo.define($config, Controller);

