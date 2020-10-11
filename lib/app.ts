
import {IOptions} from "./interfaces/IOptions";
import {

    IApp as IAgentApp,

} from "@appolo/agent";
import {IApp as IEngineApp, IClass} from "@appolo/engine";
import {Injector, Define} from "@appolo/inject";
import {Launcher} from "./launcher/launcher";
import {Discovery} from "./discovery/discovery";
import {IApp} from "./interfaces/IApp";
import {Events} from "./events/events";
import {Route} from "./route/route";
import {IEnv} from "./interfaces/IEnv";

export class App implements IAgentApp, IApp {

    private readonly _launcher: Launcher;
    private readonly _discovery: Discovery;
    private readonly _events: Events;
    private readonly _route:Route;


    constructor(options: IOptions) {

        this._launcher = new Launcher(options, this);

        this._discovery = new Discovery(this, this._launcher.engine.discovery)

        this.injector.addObject("app", this, true);

        this._events = new Events(this,this._launcher);
        this._route = new Route(this._launcher);


        this._launcher.agent.requestApp = this;
    }

    public static create(options: IOptions): App {
        return new App(options);
    };

    public get discovery(): Discovery {
        return this._discovery;
    }

    public get event(): Events {
        return this._events
    }

    public get route(){
        return this._route
    }

    public get module() {
        return this._launcher.engine.module
    }

    public get tree() {
        return this._launcher.engine.tree
    }

    public async launch(): Promise<App> {

        await this._launcher.launch();


        return this;
    }

    public get dispatcher() {
        return this._launcher.engine.dispatcher
    }

    public get options(): IOptions {
        return this._launcher.options
    }


    public set<T extends keyof IOptions>(name: T, value: IOptions[T]) {
        this._launcher.setOptions(name,value);
    }

    public async reset() {
        await this._launcher.reset();
    }

    public register(id: string | IClass, type?: IClass): Define {
        return this._launcher.engine.register(id, type)
    }

    public get injector(): Injector {
        return this._launcher.engine.injector;
    }

    public get container(): Injector {
        return this._launcher.engine.injector;
    }

    public get env(): IEnv {
        return this._launcher.engine.env;
    }

    public get environment(): IEnv {
        return this._launcher.engine.env;
    }





}
