"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _path = require("path");
const _ = require("lodash");
const launcher_1 = require("./launcher/launcher");
const route_1 = require("./routes/route");
class App {
    constructor(options) {
        this.handle = (request, response) => {
            this._launcher.agent.handle(request, response);
        };
        this._launcher = new launcher_1.Launcher(options);
        this._launcher.engine.injector.addObject("app", this, true);
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
    use(fn) {
        this._launcher.agent.use(fn);
        return this;
    }
    module(moduleFn) {
        return this._launcher.engine.module(moduleFn);
    }
    viewEngine(fn, ext = "html") {
        this._launcher.options.viewEngine = fn;
        this._launcher.options.viewExt = ext;
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
}
exports.App = App;
//# sourceMappingURL=app.js.map