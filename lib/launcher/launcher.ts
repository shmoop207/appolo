"use strict";

import {App as Engine} from 'appolo-engine';
import {Agent} from 'appolo-agent';

import {Router} from '../routes/router';
import * as path from 'path';
import * as _ from 'lodash';
import {IOptions} from "../interfaces/IOptions";
import {RouterControllerSymbol, RouterDefinitionsClassSymbol, RouterDefinitionsSymbol} from "../decorators/decorators";
import {Route} from "../routes/route";
import {IController} from "../controller/IController";
import {Util} from "../util/util";


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
    viewFolder: "server/views",
    validatorOptions: {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    }
};

export class Launcher {

    private _engine: Engine;
    private _agent: Agent;
    private _options: IOptions;
    private _port: number;
    private _router: Router;

    constructor(options: IOptions) {

        this._options = _.defaults({}, options, Defaults);

        this._engine = new Engine(this._options);
        this._agent = new Agent(this._options);
        this._port = this._getPort();
        this._engine.injector.addObject("httpServer", this._agent.server);

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

        this._engine.plugin((fn: Function) => this._addRoute(fn));

        await this.loadCustomConfigurations();

        await this._engine.launch();

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

            this._router.addRoute(route)
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

        try {
            this._engine.injector.get<any>("logger").info(msg);
        } catch (e) {
            console.log(msg);
        }


    }


    public async reset() {

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

    //
    // public softReset() {
    //     this.reset(true)
    // }
}

