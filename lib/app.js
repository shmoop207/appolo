"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const agent_1 = require("@appolo/agent");
const engine_1 = require("@appolo/engine");
const route_1 = require("@appolo/route");
const launcher_1 = require("./launcher/launcher");
const events_1 = require("@appolo/events");
const discovery_1 = require("./launcher/discovery");
class App extends events_1.EventDispatcher {
    constructor(options) {
        super();
        this.handle = (request, response) => {
            this._launcher.agent.handle(request, response);
        };
        this._discovery = new discovery_1.Discovery(this);
        this._launcher = new launcher_1.Launcher(options, this);
        this.injector.addObject("app", this, true);
        this._launcher.agent.requestApp = this;
    }
    static create(options) {
        return new App(options);
    }
    ;
    get discovery() {
        return this._discovery;
    }
    getRoute(path, method) {
        return this._launcher.router.getRoute(path, method);
    }
    async launch() {
        await this._launcher.launch();
        return this;
    }
    get options() {
        return this._launcher.options;
    }
    use(path, ...middleware) {
        this._launcher.router.addMiddleware(path, middleware, false);
        return this;
    }
    error(path, ...middleware) {
        this._launcher.router.addMiddleware(path, middleware, true);
        return this;
    }
    addHook(name, ...hooks) {
        this._launcher.router.addHook(name, ...hooks);
        return this;
    }
    async module(...modules) {
        return this._launcher.engine.module(...modules);
    }
    moduleAt(index) {
        return this.children[index];
    }
    set(name, value) {
        this._launcher.options[name] = value;
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
    route(controller) {
        let route = new route_1.Route(controller);
        this._launcher.router.addRoute(route);
        return route;
    }
    addRouteFromClass(klass) {
        this._launcher.router.addRouteFromClass(klass);
    }
    get parent() {
        return this._launcher.engine.parent;
    }
    get root() {
        return this._launcher.engine.root;
    }
    get children() {
        return this._launcher.engine.children;
    }
    get(path, ...handler) {
        this._launcher.agent.get(path, ...handler);
        return this;
    }
    post(path, ...handler) {
        this._launcher.agent.post(path, ...handler);
        return this;
    }
    delete(path, ...handler) {
        this._launcher.agent.post(path, ...handler);
        return this;
    }
    patch(path, ...handler) {
        this._launcher.agent.patch(path, ...handler);
        return this;
    }
    get server() {
        return this._launcher.agent.server;
    }
    on(event, fn, scope) {
        if (event in engine_1.Events) {
            this._launcher.engine.on(event, fn, scope);
        }
        else if (event in agent_1.Events) {
            this._launcher.agent.on(event, fn, scope);
        }
        else {
            super.on(event.toString(), fn, scope);
        }
    }
    once(event, fn, scope) {
        if (event in engine_1.Events) {
            this._launcher.engine.once(event, fn, scope);
        }
        else if (event in agent_1.Events) {
            this._launcher.agent.once(event, fn, scope);
        }
        else {
            super.once(event.toString(), fn, scope);
        }
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map