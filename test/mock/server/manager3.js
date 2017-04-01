"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo = require("../../../index");
class Manager3 extends appolo.EventDispatcher {
    constructor() {
        super();
    }
    run() {
    }
}
exports.default = Manager3;
appolo.define('manager3', Manager3)
    .namespace("Test.Manager3")
    .statics("TEST", 1)
    .statics({ TEST2: 2 })
    .singleton()
    .inject('manager');
//# sourceMappingURL=manager3.js.map