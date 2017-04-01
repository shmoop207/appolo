"use strict";
import appolo = require('../../../index');
import {Manager} from "./manager";

 export default class Manager3 extends appolo.EventDispatcher {
    manager:Manager
    TEST:number
    TEST2:number
    constructor() {
        super();
    }

    run() {


    }
}

appolo.define('manager3',Manager3)
    .namespace("Test.Manager3")
    .statics("TEST",1)
    .statics({TEST2:2})
    .singleton()
    .inject('manager')


