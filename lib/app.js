"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const route_1 = require("@appolo/route");
const launcher_1 = require("./launcher/launcher");
const discovery_1 = require("./discovery/discovery");
class App {
    constructor(options) {
        this.handle = (request, response) => {
            this._launcher.agent.handle(request, response);
        };
        this._launcher = new launcher_1.Launcher(options, this);
        this._discovery = new discovery_1.Discovery(this, this._launcher.engine.discovery);
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
    getParent() {
        return this._launcher.engine.getParent();
    }
    getRoot() {
        return this._launcher.engine.getRoot();
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
    get eventModuleExport() {
        return this._launcher.engine.eventModuleExport;
    }
    get eventBeforeModuleInit() {
        return this._launcher.engine.eventBeforeModuleInit;
    }
    get eventModuleInit() {
        return this._launcher.engine.eventModuleInit;
    }
    get eventBeforeModulesLoad() {
        return this._launcher.engine.eventBeforeModulesLoad;
    }
    get eventModulesLoaded() {
        return this._launcher.engine.eventModulesLoaded;
    }
    get eventBeforeInjectorInit() {
        return this._launcher.engine.eventBeforeInjectorInit;
    }
    get eventInjectorInit() {
        return this._launcher.engine.eventInjectorInit;
    }
    get eventBeforeBootstrap() {
        return this._launcher.engine.eventBeforeBootstrap;
    }
    get eventBootstrap() {
        return this._launcher.engine.eventBootstrap;
    }
    get eventsBeforeInjectRegister() {
        return this._launcher.engine.eventsBeforeInjectRegister;
    }
    get eventsEventClassExport() {
        return this._launcher.engine.eventsEventClassExport;
    }
    get eventsInjectRegister() {
        return this._launcher.engine.eventsInjectRegister;
    }
    get eventsBeforeReset() {
        return this._launcher.engine.eventsBeforeReset;
    }
    get eventsReset() {
        return this._launcher.engine.eventsReset;
    }
    get eventInstanceInitialized() {
        return this._launcher.engine.eventInstanceInitialized;
    }
    get eventInstanceOwnInitialized() {
        return this._launcher.engine.eventInstanceOwnInitialized;
    }
    get eventInstanceCreated() {
        return this._launcher.engine.eventInstanceCreated;
    }
    get eventInstanceOwnCreated() {
        return this._launcher.engine.eventInstanceOwnCreated;
    }
    get eventRouteAdded() {
        return this._launcher.agent.eventRouteAdded;
    }
    get eventServerClosed() {
        return this._launcher.agent.eventServerClosed;
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map