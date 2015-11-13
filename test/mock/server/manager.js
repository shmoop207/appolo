"use strict";
var appolo = require('../../../index');



class Manager extends appolo.EventDispatcher {

    constructor() {
        super();
    }

    run() {


        this.working = true;


    }
}

let $config = {
    id: 'manager',
    singleton: true,
    type:Manager
};

module.exports = appolo.define($config);
