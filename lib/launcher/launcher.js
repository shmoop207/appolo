"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Launcher = void 0;
const engine_1 = require("@appolo/engine");
const agent_1 = require("@appolo/agent");
const route_1 = require("@appolo/route");
const path = require("path");
const utils_1 = require("@appolo/utils");
const defaults_1 = require("../defaults/defaults");
class Launcher {
    constructor(options, _app) {
        this._app = _app;
        this._options = utils_1.Objects.defaults({}, options || {}, defaults_1.Defaults);
        this._engine = new engine_1.App(this._options);
        this._agent = new agent_1.Agent(this._options);
        this._port = this._getPort();
        this._engine.injector.addObject("httpServer", this._agent.server);
        this._router = new route_1.Router(this._engine.env, this._engine.injector, this._agent);
    }
    get engine() {
        return this._engine;
    }
    get options() {
        return this._options;
    }
    get agent() {
        return this._agent;
    }
    get router() {
        return this._router;
    }
    setOptions(name, value) {
        this._options[name] = value;
        this.agent.options[name] = value;
        this.engine.options[name] = value;
    }
    async launch() {
        this._engine.event.afterInjectRegister.on(payload => this.router.addRouteFromClass(payload.type));
        this._app.event.onModuleExport.on(payload => this.router.addRouteFromClass(payload.type));
        await this._engine.launch();
        await this._app.event.beforeGlobalMiddlewares.fireEventAsync();
        await this.loadCustomConfigurations();
        await this._app.event.afterGlobalMiddlewares.fireEventAsync();
        await this._app.event.beforeRouterInitialize.fireEventAsync();
        this._router.initialize();
        await this._app.event.afterRouterInitialize.fireEventAsync();
        if (this._options.startServer) {
            await this.startServer();
        }
    }
    async startServer() {
        await this._agent.listen(this._port);
        this._logServerMessage();
        this._isServerRunning = true;
    }
    _getPort() {
        return parseFloat(process.env.APP_PORT) || parseFloat(process.env.PORT) || this._options.port || this._engine.env.port || 8080;
    }
    get port() {
        return this._port;
    }
    async loadCustomConfigurations() {
        let allPath = path.join(this._options.root, 'config/middlewares/all.js'), environmentPath = path.join(this._options.root, 'config/middlewares/', this._options.environment + '.js');
        await engine_1.Util.loadPathWithArgs([allPath, environmentPath], this._engine.injector);
    }
    _logServerMessage() {
        let msg = utils_1.Strings.replaceFormat(this._options.startMessage, {
            port: this._port,
            version: this._engine.env.version,
            environment: this._engine.env.type
        });
        engine_1.Util.logger(this._engine.injector).info(msg);
    }
    get isServerRunning() {
        return this._isServerRunning;
    }
    async reset() {
        await this._engine.reset();
        await this._agent.close();
        this._isServerRunning = false;
        this._app = null;
        this._router.reset();
        process.removeAllListeners();
    }
}
exports.Launcher = Launcher;
//# sourceMappingURL=launcher.js.map