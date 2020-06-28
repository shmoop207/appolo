"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const appolo_agent_1 = require("appolo-agent");
const appolo_engine_1 = require("appolo-engine");
const launcher_1 = require("./launcher/launcher");
const route_1 = require("./routes/route");
const util_1 = require("./util/util");
const invokeActionMiddleware_1 = require("./routes/invokeActionMiddleware");
class App extends appolo_engine_1.EventDispatcher {
    constructor(options) {
        super();
        this.handle = (request, response) => {
            this._launcher.agent.handle(request, response);
        };
        this._launcher = new launcher_1.Launcher(options, this);
        this.injector.addObject("app", this, true);
        this._launcher.agent.requestApp = this;
    }
    static create(options) {
        return new App(options);
    }
    ;
    get exportedClasses() {
        return this.exported;
    }
    get exported() {
        return this._launcher.engine.exported;
    }
    get exportedRoot() {
        return this._launcher.engine.exportedRoot;
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
    // public enableContext(contextCtr?: typeof Context) {
    //
    //     let context = namespace.create(RequestContextSymbol, contextCtr);
    //
    //     this.injector.addObject("context", context);
    //
    //     context.initialize();
    //
    //     this.use((req: IRequest, res: IResponse, next: NextFn) => context.scope(next))
    // }
    // public getContext() {
    //     return namespace.get(RequestContextSymbol);
    // }
    use(path, ...middleware) {
        return this._addMiddleware(path, middleware, false);
    }
    error(path, ...middleware) {
        return this._addMiddleware(path, middleware, true);
    }
    _addMiddleware(path, middleware, error) {
        if (typeof path !== "string") {
            middleware.unshift(path);
        }
        for (let i = 0; i < middleware.length; i++) {
            let id = util_1.Util.getClassId(middleware[i]);
            if (id) {
                middleware[i] = error ? invokeActionMiddleware_1.invokeMiddleWareError(id) : invokeActionMiddleware_1.invokeMiddleWare(id);
            }
        }
        if (error) {
            this._launcher.agent.error(...middleware);
        }
        else {
            if (typeof path === "string") {
                middleware.unshift(path);
            }
            this._launcher.agent.use(...middleware);
        }
        return this;
    }
    addHook(name, ...hooks) {
        hooks = util_1.Util.convertMiddlewareHooks(name, hooks);
        this._launcher.agent.addHook(name, ...hooks);
        return this;
    }
    module(...moduleFn) {
        return this._launcher.engine.module(...moduleFn);
    }
    moduleAt(index) {
        return this.children[index];
    }
    viewEngine(fn, ext = "html", cache = true) {
        this._launcher.options.viewEngine = fn;
        this._launcher.options.viewExt = ext;
        this._launcher.options.viewCache = cache;
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
        this._launcher.addRoute(klass);
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
        if (event in appolo_engine_1.Events) {
            this._launcher.engine.on(event, fn, scope);
        }
        else if (event in appolo_agent_1.Events) {
            this._launcher.agent.on(event, fn, scope);
        }
        else {
            super.on(event.toString(), fn, scope);
        }
    }
    once(event, fn, scope) {
        if (event in appolo_engine_1.Events) {
            this._launcher.engine.once(event, fn, scope);
        }
        else if (event in appolo_agent_1.Events) {
            this._launcher.agent.once(event, fn, scope);
        }
        else {
            super.once(event.toString(), fn, scope);
        }
    }
    plugin(plugin, options) {
        this._launcher.plugin(plugin, options);
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map