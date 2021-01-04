import {Launcher} from "../launcher/launcher";
import {IEvents} from "@appolo/engine";
import {Events as AgentEvents} from "@appolo/agent";
import {IApp} from "../interfaces/IApp";
import {Event, IEvent} from "@appolo/events/index";

export class Events implements IEvents {

    constructor(_app: IApp, private _launcher: Launcher) {
    }

    public get onModuleExport() {
        return this._launcher.engine.event.onModuleExport;
    }

    public get beforeModuleInitialize() {
        return this._launcher.engine.event.beforeModuleInitialize;
    }

    public get afterModuleInitialize() {
        return this._launcher.engine.event.afterModuleInitialize;
    }

    public get beforeModulesLoad() {
        return this._launcher.engine.event.beforeModulesLoad;
    }

    public get afterModulesLoaded() {
        return this._launcher.engine.event.afterModulesLoaded;
    }

    public get beforeInjectorInitialize() {
        return this._launcher.engine.event.beforeInjectorInitialize;
    }

    public get afterInjectorInitialize() {
        return this._launcher.engine.event.afterInjectorInitialize;
    }

    public get beforeBootstrap() {
        return this._launcher.engine.event.beforeBootstrap;
    }

    public get afterBootstrap() {
        return this._launcher.engine.event.afterBootstrap;
    }

    public get afterLaunch() {
        return this._launcher.engine.event.afterLaunch;
    }

    public get beforeInjectRegister() {
        return this._launcher.engine.event.beforeInjectRegister;
    }

    public get onClassExport() {
        return this._launcher.engine.event.onClassExport;
    }

    public get afterInjectRegister() {
        return this._launcher.engine.event.afterInjectRegister;
    }

    public get beforeReset() {
        return this._launcher.engine.event.beforeReset;
    }

    public get afterReset() {
        return this._launcher.engine.event.afterReset;
    }

    public get onOwnInstanceInitialized() {
        return this._launcher.engine.event.onOwnInstanceInitialized;
    }

    public get onInstanceInitialized() {
        return this._launcher.engine.event.onInstanceInitialized;
    }

    public get onOwnInstanceCreated() {
        return this._launcher.engine.event.onOwnInstanceCreated;
    }

    public get onInstanceCreated() {
        return this._launcher.engine.event.onInstanceCreated;
    }

    public get beforeInjectInitMethods() {
        return this._launcher.engine.event.beforeInjectInitMethods;
    };

    public get beforeInjectBootstrapMethods() {
        return this._launcher.engine.event.beforeInjectBootstrapMethods;
    };

    public get onRouteAdded() {
        return this._launcher.agent.events.routeAdded;
    }

    public get onRouteRegister() {
        return this._launcher.router.onRouteAddedEvent
    }

    public get beforeServerClosed() {
        return this._launcher.agent.events.beforeServerClosed;
    }

    public get afterServerClosed() {
        return this._launcher.agent.events.afterServerClosed;
    }

    public get beforeServerOpen() {
        return this._launcher.agent.events.beforeServerOpen;
    }

    public get afterServerOpen() {
        return this._launcher.agent.events.afterServerOpen;
    }

    public get beforeInjectInitDefinitions(){
        return this._launcher.engine.event.beforeInjectInitDefinitions;
    }
    public get beforeInjectInitFactories(){
        return this._launcher.engine.event.beforeInjectInitFactories;

    }
    public get beforeInjectInitInstances(){
        return this._launcher.engine.event.beforeInjectInitInstances;

    }
    public get beforeInjectInitProperties(){
        return this._launcher.engine.event.beforeInjectInitProperties;

    }



    public readonly beforeGlobalMiddlewares: IEvent<void> = new Event();
    public readonly afterGlobalMiddlewares: IEvent<void> = new Event();

    public readonly beforeRouterInitialize: IEvent<void> = new Event();
    public readonly afterRouterInitialize: IEvent<void> = new Event();


}

