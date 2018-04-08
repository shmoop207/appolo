"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_engine_1 = require("appolo-engine");
const appolo_agent_1 = require("appolo-agent");
const router_1 = require("../routes/router");
const path = require("path");
const _ = require("lodash");
const decorators_1 = require("../decorators/decorators");
let Defaults = {
    startMessage: "Appolo Server listening on port: ${port} version:${version} environment: ${environment}",
    startServer: true,
    errorStack: false,
    errorMessage: true,
    maxRouteCache: 10000,
    qsParser: "qs",
    urlParser: "fast",
    viewExt: "html",
    viewEngine: null,
    viewFolder: "server/views",
    validatorOptions: {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    }
};
class Launcher {
    constructor(options) {
        this._options = _.defaults({}, options, Defaults);
        this._engine = new appolo_engine_1.App(options);
        this._agent = new appolo_agent_1.Agent(options);
        this._port = this._getPort();
        this._engine.injector.addObject("httpServer", this._agent.server);
        this._router = new router_1.Router(this._engine.env, this._engine.injector, this._options, this._agent);
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
    async launch() {
        this._engine.plugin((fn) => this._addRoute(fn));
        await this.loadCustomConfigurations();
        await this._engine.launch();
        this._router.initialize();
        await this._agent.listen(this._port);
    }
    _addRoute(fn) {
        let routeData = Reflect.getMetadata(decorators_1.RouterDefinitionsSymbol, fn);
        if (!routeData) {
            return;
        }
        _.forEach(routeData, (route, key) => {
            this._router.addRoute(route);
        });
    }
    _getPort() {
        return process.env.APP_PORT || process.env.PORT || this._options.port || this._engine.env.port || 8080;
    }
    async loadCustomConfigurations() {
        let allPath = path.join(this._options.root, 'config/express/all.js'), environmentPath = path.join(this._options.root, 'config/express/', this._options.environment + '.js');
        await appolo_engine_1.Util.loadPathWithArgs([allPath, environmentPath], this._engine.injector);
    }
    // public async startServer() {
    //
    //     let msg = _.template(this._options.startMessage, {interpolate: /\${([\s\S]+?)}/g})({
    //         port: this._port,
    //         version: appolo.environment.version,
    //         environment: appolo.environment.type
    //     });
    //
    //     console.log(msg);
    //
    // }
    async reset() {
        await this._agent.close();
        this._engine.reset();
        //     super.reset(isSoftReset);
        //
        //     if (!isSoftReset) {
        //
        //         _.forEach(this.cachedRequire, (filePath) => delete require.cache[filePath]);
        //
        //         router.reset();
        //     }
        //
        //     this.cachedRequire.length = 0;
        //     this._options = null;
        //
        //     try {
        //         this._server.close();
        //     } catch (e) {
        //         console.log("failed to close server", e)
        //     }
        //
        process.removeAllListeners();
    }
}
exports.Launcher = Launcher;
//# sourceMappingURL=launcher.js.map