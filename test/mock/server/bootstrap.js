"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo = require("../../../index");
class Bootstrap extends appolo.EventDispatcher {
    constructor() {
        super();
    }
    run(callback) {
        this.working = true;
        callback();
    }
}
exports.Bootstrap = Bootstrap;
appolo.define('appolo-bootstrap', Bootstrap)
    .singleton()
    .inject("manager");
//# sourceMappingURL=bootstrap.js.map