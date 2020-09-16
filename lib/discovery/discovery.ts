import {Discovery as EngineDiscovery} from "@appolo/engine"
import {Controller, StaticController, IController, Route, Util} from "@appolo/route";
import {IApp} from "../interfaces/IApp";

export class Discovery extends EngineDiscovery {
    constructor(app: IApp, engineDiscovery: EngineDiscovery) {
        super(app);

        this._exported = engineDiscovery.exported;
    }

    public getControllerName(controller: string | typeof Controller | typeof StaticController): string {
        return Discovery.getControllerName(controller)
    }

    public static getControllerName(controller: string | typeof Controller | typeof StaticController): string {
        return Util.getControllerName(controller)
    }

    public decorateRequest(name: string, fn: Function) {
        return Discovery.decorateRequest(name, fn);
    }

    public static decorateRequest(name: string, fn: Function) {
        Util.decorateRequest(name, fn);
    }

    public decorateResponse(name: string, fn: Function) {
        return Discovery.decorateResponse(name, fn);
    }

    public static decorateResponse(name: string, fn: Function) {
        Util.decorateResponse(name, fn);
    }

    public getRouteDefinition<T extends IController>(fn: any, action: ((c: T) => Function) | string): Route<T> {

        return Discovery.getRouteDefinition(fn, action);
    }

    public static getRouteDefinition<T extends IController>(fn: any, action: ((c: T) => Function) | string): Route<T> {

        return Util.getRouteDefinition(fn, action);
    }

    public createRouteDefinition<T extends IController>(fn: any, action: ((c: T) => Function) | string): Route<T> {
        return Discovery.createRouteDefinition(fn, action)
    }

    public static createRouteDefinition<T extends IController>(fn: any, action: ((c: T) => Function) | string): Route<T> {
        return Util.createRouteDefinition(fn, action)
    }

    public isController(fn: any): boolean {
        return Discovery.isController(fn);
    }

    public static isController(fn: any): boolean {
        return Util.isController(fn);
    }
}
