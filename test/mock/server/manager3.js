"use strict";
var appolo = require('../../../index');

class Manager3 extends appolo.EventDispatcher {


    constructor() {
        super();
    }

    run() {


    }
}

appolo.define('manager3',Manager3)
    .singleton()
    .inject('manager')
    .namespace("Test.Manager3")
    .statics("TEST",1)
    .statics({TEST2:2})

