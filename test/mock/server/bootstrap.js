"use strict";
var appolo = require('../../../index');

let $config = {
    id: 'appolo-bootstrap',
    singleton: true,
    inject: ['manager']
};

class Bootstrap extends appolo.EventDispatcher {

    constructor() {
        super();
    }

    run(callback) {


        this.working = true;

        callback();
    }
}

module.exports = appolo.define($config, Bootstrap);