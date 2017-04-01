"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo = require("../../../index");
class Controller extends appolo.EventDispatcher {
    constructor() {
        super();
    }
    run() {
        this.working = true;
    }
}
exports.Controller = Controller;
appolo.define("controller")
    .type(Controller)
    .inject("manager logger2");
//# sourceMappingURL=controller.js.map