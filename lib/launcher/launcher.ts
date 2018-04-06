"use strict";

import {App as Engine, Util} from 'appolo-engine';
import {Agent} from 'appolo-agent';

import {Router} from '../routes/router';
import * as path from 'path';
import * as fs from 'fs';
import * as Q from 'bluebird';
import * as _ from 'lodash';
import {IOptions} from "../interfaces/IOptions";
import ErrnoException = NodeJS.ErrnoException;
import {RouterDefinitionsSymbol} from "../decorators/decorators";
import {Route} from "../routes/route";
import {IController} from "../controller/IController";


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

        this._engine = new Engine(options);
        this._agent = new Agent(options);
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


        //this.bindProcessEvents();

        await this.loadCustomConfigurations();

        await this._engine.launch();

        this._router.initialize();

        await this._agent.listen(this._port);

    }


    // protected bindProcessEvents() {
    //     process.on('uncaughtException', (err: ErrnoException) => {
    //         if (err.code !== 'EADDRINUSE') {
    //             console.error(err.stack || err.toString())
    //             return;
    //         }
    //
    //         console.error(`EADDRINUSE!!!! address in use port: ${this._port}`);
    //         process.exit(1);
    //     })
    // }


    private _addRoute(fn: Function) {
        let routeData = Reflect.getMetadata(RouterDefinitionsSymbol, fn);

        if (!routeData) {
            return
        }

        _.forEach(routeData, (route: Route<IController>, key: string) => {
            this._router.addRoute(route)
        })


    }

    protected _getPort(): number {

        return process.env.APP_PORT || process.env.PORT || this._options.port || this._engine.env.port || 8080;
    }

    protected async loadCustomConfigurations() {

        let allPath = path.join(this._options.root, 'config/express/all.js'),
            environmentPath = path.join(this._options.root, 'config/express/', this._options.environment + '.js');

        await Util.loadPathWithArgs([allPath, environmentPath], this._engine.injector);

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

