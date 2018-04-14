import    http = require('http');
import    _path = require('path');
import    _ = require('lodash');
import {IOptions} from "./interfaces/IOptions";
import {IApp, MiddlewareHandler, MiddlewareHandlerAny} from "appolo-agent";
import {Define, IEnv, Injector} from "appolo-engine";
import {ModuleFn} from "appolo-engine/lib/modules/modules";
import {Launcher} from "./launcher/launcher";
import {Route} from "./routes/route";
import {IController} from "./controller/IController";
import {Controller} from "./controller/controller";
import {StaticController} from "./controller/staticController";
import {IResponse} from "./interfaces/IResponse";

export class App implements IApp {

    private _launcher: Launcher;


    constructor(options: IOptions) {

        this._launcher = new Launcher(options);

        this._launcher.engine.injector.addObject("app", this, true);
        this._launcher.agent.requestApp = this;
    }

    public static create(options: IOptions): App {
        return new App(options);
    };

    render(path: string | string[], params?: any, res?: IResponse): Promise<string> {

        if (!res) {
            return this._launcher.agent.render(path, params);
        }

        if (!path) {
            path = _path.resolve(this._launcher.options.root, "src/controllers", res.req.route.controllerName, res.req.route.actionName);
        }
        let paths = _.isArray(path) ? path : [path];

        if (_.isString(path)) {
            paths.push(_path.resolve(this._launcher.options.root, "src/controllers", res.req.route.controllerName, path))
        }
        return this._launcher.agent.render(paths, params)
    }

    public async launch(): Promise<App> {

        await  this._launcher.launch();


        return this;
    }

    public get options(): IOptions {
        return this._launcher.options
    }


    public use(fn: MiddlewareHandler | MiddlewareHandlerAny): this {
        this._launcher.agent.use(fn);

        return this;
    }

    public module(moduleFn: ModuleFn): Promise<any> {
        return this._launcher.engine.module(moduleFn)
    }

    public viewEngine(fn: (path: string, options?: { cache?: boolean, [otherOptions: string]: any }) => Promise<string>, ext: string = "html"): void {
        this._launcher.options.viewEngine = fn;
        this._launcher.options.viewExt = ext;
    }

    public set(name: keyof IOptions, value: any) {
        this._launcher.options[name] = value;
    }

    public async reset() {
        await this._launcher.reset();
    }

    public register(id: string | Function, type?: Function): Define {
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

    public route<T extends IController>(controller: string | typeof Controller | typeof StaticController): Route<T> {
        let route = new Route(controller);

        this._launcher.router.addRoute(route);

        return route
    }

    public handle = (request: http.IncomingMessage, response: http.ServerResponse) => {
        this._launcher.agent.handle(request, response)
    }
}

//TODO abstract routes on class
//TODO response try catch
//TODO add server load message
