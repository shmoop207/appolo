"use strict";
var appolo = require('../../../index');

module.exports = class Manager2 extends appolo.EventDispatcher {

    static get $config() {
        return  {
            id: 'manager2',
            singleton: true,
            inject:['manager']
        }
    }

    constructor() {
        super();
    }

    run() {


    }
}

