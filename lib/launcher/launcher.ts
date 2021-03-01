"use strict";

import {App as Engine, Util as EngineUtils} from '@appolo/engine';
import {Agent} from '@appolo/agent';
import {Router, Route, IController, Util} from '@appolo/route';

import * as path from 'path';

import {Objects, Strings} from '@appolo/utils';
import {IOptions} from "../interfaces/IOptions";

import {App} from "../app";
import {Defaults} from "../defaults/defaults";
import {IEnv} from "../interfaces/IEnv";
import {Event} from "@appolo/events";

export class Launcher {

    private readonly _engine: Engine;
    private readonly _agent: Agent;
    private readonly _options: IOptions;
    private readonly _port: number;
    private readonly _router: Router;

    private _isServerRunning: boolean;


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

    public setOptions<T extends keyof IOptions>(name: T, value: IOptions[T]) {
        this._options[name] = value;
        this.agent.options[name as string] = value;
        this.engine.options[name as string] = value;
    }

    public async launch(): Promise<void> {

        this._engine.event.afterInjectRegister.on(payload => this.router.addRouteFromClass(payload.type));

        this._app.event.onModuleExport.on(payload => this.router.addRouteFromClass(payload.type));

        await this._engine.launch();

        await (this._app.event.beforeGlobalMiddlewares as Event<void>).fireEventAsync()
        await this.loadCustomConfigurations();
        await (this._app.event.afterGlobalMiddlewares as Event<void>).fireEventAsync()

        await (this._app.event.beforeRouterInitialize as Event<void>).fireEventAsync()
        this._router.initialize();
        await (this._app.event.afterRouterInitialize as Event<void>).fireEventAsync()

        if (this._options.startServer) {
            await this.startServer();
        }


    }

    public async startServer() {
        await this._agent.listen(this._port);

        this._logServerMessage();

        this._isServerRunning = true;
    }


    public _getPort(): number {

        return parseFloat(process.env.APP_PORT) || parseFloat(process.env.PORT) || this._options.port || (this._engine.env as |IEnv).port || 8080;
    }

    public get port(): number {
        return this._port;
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

    public get isServerRunning(): boolean {
        return this._isServerRunning
    }

    public async reset() {

        await this._engine.reset();

        await this._agent.close();

        this._isServerRunning = false;

        this._app = null;

        this._router.reset();


        process.removeAllListeners();
    }

    // public plugin(plugin: Plugin, options: any) {
    //     this._plugins.push({plugin, options});
    // }


}

