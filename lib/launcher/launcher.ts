"use strict";

import {App as Engine, Events as EngineEvents, Util as EngineUtils} from '@appolo/engine';
import {Agent} from '@appolo/agent';
import {Router, Route, IController, Util} from '@appolo/route';

import * as path from 'path';

import {Objects, Strings} from '@appolo/utils';
import {IOptions} from "../interfaces/IOptions";

import {App} from "../app";
import {Defaults} from "../defaults/defaults";

export class Launcher {

    private readonly _engine: Engine;
    private readonly _agent: Agent;
    private readonly _options: IOptions;
    private readonly _port: number;
    private readonly _router: Router;


    constructor(options: IOptions, private _app: App) {

        this._options = Objects.defaults({}, options || {}, Defaults);

        this._engine = new Engine(this._options);
        this._agent = new Agent(this._options);
        this._port = this._getPort();
        this._engine.injector.addObject("httpServer", this._agent.server);

        this._router = new Router(this._engine.env, this._engine.injector, this._agent);

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

        this._engine.on(EngineEvents.InjectRegister, this.router.addRouteFromClass, this.router);

        this._app.on(EngineEvents.ModuleExport, this.router.addRouteFromClass, this.router);

        await this._engine.launch();

        await this.loadCustomConfigurations();

        this._router.initialize();

        await this._agent.listen(this._port);

        this._logServerMessage();
    }


    protected _getPort(): number {

        return process.env.APP_PORT || process.env.PORT || this._options.port || this._engine.env.port || 8080;
    }

    protected async loadCustomConfigurations() {

        let allPath = path.join(this._options.root, 'config/middlewares/all.js'),
            environmentPath = path.join(this._options.root, 'config/middlewares/', this._options.environment + '.js');

        await EngineUtils.loadPathWithArgs([allPath, environmentPath], this._engine.injector);

    }

    private _logServerMessage() {

        let msg = Strings.replaceFormat(this._options.startMessage, {
            port: this._port,
            version: this._engine.env.version,
            environment: this._engine.env.type
        });

        EngineUtils.logger(this._engine.injector).info(msg)
    }


    public async reset() {

        await this._engine.reset();

        await this._agent.close();

        this._app = null;

        this._router.reset();


        process.removeAllListeners();
    }

    // public plugin(plugin: Plugin, options: any) {
    //     this._plugins.push({plugin, options});
    // }


}

