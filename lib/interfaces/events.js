"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
var Events;
(function (Events) {
    Events["RouteAdded"] = "routeAdded";
    Events["ServerClosed"] = "serverClosed";
    Events["RequestInit"] = "requestInit";
    Events["ResponseSend"] = "ResponseSend";
    Events["BeforeModulesLoad"] = "beforeModulesLoad";
    Events["ModulesLoaded"] = "modulesLoaded";
    Events["BeforeInjectorInit"] = "beforeInjectorInit";
    Events["InjectorInit"] = "injectorInit";
    Events["BeforeBootstrap"] = "beforeBootstrap";
    Events["Bootstrap"] = "bootstrap";
    Events["BeforeInjectRegister"] = "beforeInjectRegister";
    Events["InjectRegister"] = "injectRegister";
    Events["BeforeModuleInit"] = "beforeModuleInit";
    Events["ModuleInit"] = "moduleInit";
    Events["ModuleExport"] = "moduleExport";
    Events["ClassExport"] = "classExport";
    Events["Reset"] = "reset";
    Events["BeforeReset"] = "reset";
})(Events = exports.Events || (exports.Events = {}));
//# sourceMappingURL=events.js.map