"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const launcher_1 = require("./launcher/launcher");
const discovery_1 = require("./discovery/discovery");
const events_1 = require("./events/events");
const route_1 = require("./route/route");
class App {
    constructor(options) {
        this._launcher = new launcher_1.Launcher(options, this);
        this._discovery = new discovery_1.Discovery(this, this._launcher.engine.discovery);
        this.injector.addObject("app", this, true);
        this._events = new events_1.Events(this, this._launcher);
        this._route = new route_1.Route(this._launcher);
        this._launcher.agent.requestApp = this;
    }
    static create(options) {
        return new App(options);
    }
    ;
    get discovery() {
        return this._discovery;
    }
    get event() {
        return this._events;
    }
    get route() {
        return this._route;
    }
    get module() {
        return this._launcher.engine.module;
    }
    get tree() {
        return this._launcher.engine.tree;
    }
    async launch() {
        await this._launcher.launch();
        return this;
    }
    get dispatcher() {
        return this._launcher.engine.dispatcher;
    }
    get options() {
        return this._launcher.options;
    }
    set(name, value) {
        this._launcher.setOptions(name, value);
    }
    async reset() {
        await this._launcher.reset();
    }
    register(id, type) {
        return this._launcher.engine.register(id, type);
    }
    get injector() {
        return this._launcher.engine.injector;
    }
    get container() {
        return this._launcher.engine.injector;
    }
    get env() {
        return this._launcher.engine.env;
    }
    get environment() {
        return this._launcher.engine.env;
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map