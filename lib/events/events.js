"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
class Events {
    constructor(_app, _launcher) {
        this._launcher = _launcher;
    }
    get onModuleExport() {
        return this._launcher.engine.event.onModuleExport;
    }
    get beforeModuleInitialize() {
        return this._launcher.engine.event.beforeModuleInitialize;
    }
    get afterModuleInitialize() {
        return this._launcher.engine.event.afterModuleInitialize;
    }
    get beforeModulesLoad() {
        return this._launcher.engine.event.beforeModulesLoad;
    }
    get afterModulesLoaded() {
        return this._launcher.engine.event.afterModulesLoaded;
    }
    get beforeInjectorInitialize() {
        return this._launcher.engine.event.beforeInjectorInitialize;
    }
    get afterInjectorInitialize() {
        return this._launcher.engine.event.afterInjectorInitialize;
    }
    get beforeBootstrap() {
        return this._launcher.engine.event.beforeBootstrap;
    }
    get afterBootstrap() {
        return this._launcher.engine.event.afterBootstrap;
    }
    get afterLaunch() {
        return this._launcher.engine.event.afterLaunch;
    }
    get beforeInjectRegister() {
        return this._launcher.engine.event.beforeInjectRegister;
    }
    get onClassExport() {
        return this._launcher.engine.event.onClassExport;
    }
    get afterInjectRegister() {
        return this._launcher.engine.event.afterInjectRegister;
    }
    get beforeReset() {
        return this._launcher.engine.event.beforeReset;
    }
    get afterReset() {
        return this._launcher.engine.event.afterReset;
    }
    get onOwnInstanceInitialized() {
        return this._launcher.engine.event.onOwnInstanceInitialized;
    }
    get onInstanceInitialized() {
        return this._launcher.engine.event.onInstanceInitialized;
    }
    get onOwnInstanceCreated() {
        return this._launcher.engine.event.onOwnInstanceCreated;
    }
    get onInstanceCreated() {
        return this._launcher.engine.event.onInstanceCreated;
    }
    get beforeInjectInitMethods() {
        return this._launcher.engine.event.beforeInjectInitMethods;
    }
    ;
    get beforeInjectBootstrapMethods() {
        return this._launcher.engine.event.beforeInjectBootstrapMethods;
    }
    ;
    get onRouteAdded() {
        return this._launcher.agent.events.routeAdded;
    }
    get onServerClosed() {
        return this._launcher.agent.events.serverClosed;
    }
}
exports.Events = Events;
//# sourceMappingURL=events.js.map