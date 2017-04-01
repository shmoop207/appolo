"use strict";
const appolo = require("../../../index");
class Manager2 extends appolo.EventDispatcher {
    static get $config() {
        return {
            id: 'manager2',
            singleton: true,
            inject: ['manager']
        };
    }
    constructor() {
        super();
    }
    run() {
        return this.manager.run();
    }
}
module.exports = Manager2;
//# sourceMappingURL=manager2.js.map