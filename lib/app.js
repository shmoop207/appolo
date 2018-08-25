"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _path = require("path");
const _ = require("lodash");
const appolo_context_1 = require("appolo-context");
const launcher_1 = require("./launcher/launcher");
const route_1 = require("./routes/route");
const IMiddleware_1 = require("./interfaces/IMiddleware");
class App {
    constructor(options) {
        this.handle = (request, response) => {
            this._launcher.agent.handle(request, response);
        };
        this._launcher = new launcher_1.Launcher(options);
        this.injector.addObject("app", this, true);
        this._launcher.agent.requestApp = this;
    }
    static create(options) {
        return new App(options);
    }
    ;
    render(path, params, res) {
        if (!res) {
            return this._launcher.agent.render(path, params);
        }
        if (!path) {
            path = _path.resolve(this._launcher.options.root, "src/controllers", res.req.route.controllerName, res.req.route.actionName);
        }
        let paths = _.isArray(path) ? path : [path];
        if (_.isString(path)) {
            paths.push(_path.resolve(this._launcher.options.root, "src/controllers", res.req.route.controllerName, path));
        }
        return this._launcher.agent.render(paths, params);
    }
    async launch() {
        await this._launcher.launch();
        return this;
    }
    get options() {
        return this._launcher.options;
    }
    enableContext(contextCtr) {
        let context = appolo_context_1.namespace.create(IMiddleware_1.RequestContextSymbol, contextCtr);
        this.injector.addObject("context", context);
        context.initialize();
        this.use((req, res, next) => context.scope(next));
    }
    getContext() {
        return appolo_context_1.namespace.get(IMiddleware_1.RequestContextSymbol);
    }
    use(fn) {
        this._launcher.agent.use(fn);
        return this;
    }
    module(...moduleFn) {
        return this._launcher.engine.module(...moduleFn);
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
    get parent() {
        return this._launcher.engine.parent;
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
}
exports.App = App;
//# sourceMappingURL=app.js.map