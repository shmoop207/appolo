"use strict";

import {App as Engine, Events as EngineEvents} from 'appolo-engine';
import {Agent} from 'appolo-agent';

import {Router} from '../routes/router';
import * as path from 'path';
import * as _ from 'lodash';
import {IOptions} from "../interfaces/IOptions";
import {
    RouterControllerSymbol,
    RouterDefinitionsClassSymbol,
    RouterDefinitionsCompiledSymbol,
    RouterDefinitionsSymbol
} from "../decorators/decorators";
import {Route} from "../routes/route";
import {IController} from "../controller/IController";
import {Util} from "../util/util";
import {decorate} from "../routes/decorate";
import {App} from "../app";
import {Plugin} from "../interfaces/IDefinition";


let Defaults: IOptions = {
    startMessage: "Appolo Server listening on port: ${port} version:${version} environment: ${environment}",
    startServer: true,
    errorStack: false,
    errorMessage: true,
    maxRouteCache: 10000,
    qsParser: "qs",
    urlParser: "fast",
    viewExt: "html",
    viewEngine: null,
    viewFolder: "src/views",
    validatorOptions: {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    }
};

export class Launcher {

    private readonly _engine: Engine;
    private readonly _agent: Agent;
    private readonly _options: IOptions;
    private readonly _port: number;
    private readonly _router: Router;
    private _plugins: { plugin: Plugin, options: any }[] = [];



    constructor(options: IOptions, private _app: App) {

        this._options = _.defaults({}, options, Defaults);

        this._engine = new Engine(this._options);
        this._agent = new Agent(this._options);
        this._port = this._getPort();
        this._engine.injector.addObject("httpServer", this._agent.server);

        this._agent.decorate(decorate);

        this._router = new Router(this._engine.env, this._engine.injector, this._options, this._agent);

    }

    public get engine(): Engine {
        return this._engine;
    }

    public get options(): IOptions {
        return this._options;
    }

    public get agent(): Agent {
        return this._agent;
    }

    public get router(): Router {
        return this._router;
    }


    public async launch(): Promise<void> {

        this._engine.on(EngineEvents.InjectRegister, this._addRoute, this);

        this._app.on(EngineEvents.ModuleExport, this._addRoute, this);

        await this._engine.launch();

        await this.loadCustomConfigurations();

        this._router.initialize();

        await this._agent.listen(this._port);

        this._logServerMessage();
    }

    private _addRoute(fn: Function) {

        let routeData = Reflect.getMetadata(RouterDefinitionsSymbol, fn);

        let routeAbstract: Route<IController> = Reflect.getMetadata(RouterDefinitionsClassSymbol, fn);

        if (!routeData || !Reflect.hasOwnMetadata(RouterControllerSymbol, fn)) {
            return
        }

        routeData = _.cloneDeep(routeData);
        routeAbstract = _.cloneDeep(routeAbstract);

        _.forEach(routeData, (route: Route<IController>, key: string) => {

            //add abstract route
            if (routeAbstract) {

                Util.reverseMiddleware(routeAbstract.definition);

                route.abstract(routeAbstract.definition);
            }

            let prefix = Reflect.getOwnMetadata(RouterControllerSymbol, fn);
            //add prefix to routes
            if (prefix) {
                _.forEach(route.definition.path, (_path, index) => {
                    route.definition.path[index] = path.join("/", prefix, _path);
                })
            }
            //override the controller in case we inherit it
            route.definition.controller = Util.getControllerName(fn as any);

            Reflect.defineMetadata(RouterDefinitionsCompiledSymbol, route,fn,key);

            this._router.addRoute(route);
        })


    }

    protected _getPort(): number {

        return process.env.APP_PORT || process.env.PORT || this._options.port || this._engine.env.port || 8080;
    }

    protected async loadCustomConfigurations() {

        let allPath = path.join(this._options.root, 'config/middlewares/all.js'),
            environmentPath = path.join(this._options.root, 'config/middlewares/', this._options.environment + '.js');

        await Util.loadPathWithArgs([allPath, environmentPath], this._engine.injector);

    }

    private _logServerMessage() {

        let msg = _.template(this._options.startMessage, {interpolate: /\${([\s\S]+?)}/g})({
            port: this._port,
            version: this._engine.env.version,
            environment: this._engine.env.type
        });

        Util.logger(this._engine.injector).info(msg)
    }


    public async reset() {

        this._engine.reset();

        await this._agent.close();

        this._app = null;

        this._plugins.length = 0;
        this._router.reset();




        process.removeAllListeners();
    }

    public plugin(plugin: Plugin, options: any) {
        this._plugins.push({plugin, options});
    }


}

