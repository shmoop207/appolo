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
    route(controller) {
        let route = new route_1.Route(controller);
        this._launcher.router.addRoute(route);
        return route;
    }
}
exports.App = App;
//TODO multi route
//TODO fix app injector message
//TODO reflect of RouteModel
//TODO abstract routes on class
//TODO response try catch
//# sourceMappingURL=app.js.map