"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo = require("../../../index");
class Manager extends appolo.EventDispatcher {
    constructor() {
        super();
    }
    run() {
        this.working = true;
        return true;
    }
}
exports.Manager = Manager;
module.exports = appolo.define('manager').type(Manager).singleton();
//# sourceMappingURL=manager.js.map