"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const launcher_1 = require("./launcher/launcher");
const route_1 = require("./routes/route");
class App {
    constructor(options) {
        this.handle = (request, response) => {
            this._launcher.agent.handle(request, response);
        };
        this._launcher = new launcher_1.Launcher(options);
        this._launcher.engine.injector.addObject("app", this, true);
    }
    static create(options) {
        return new App(options);
    }
    ;
    async launch() {
        await this._launcher.launch();
        return this;
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
//TODO abstract routes on class
//TODO response try catch
//TODO fix view
//TODO add server load message
//# sourceMappingURL=app.js.map