import {Events as EngineEvents} from "appolo-engine";
import {Events as AgentEvents} from "appolo-agent";

export type Events  = EngineEvents & AgentEvents

// export type Events {
//     RouteAdded = "routeAdded",
//     ServerClosed = "serverClosed",
//     RequestInit = "requestInit",
//     ResponseSend = "ResponseSend",
//     BeforeModulesLoad = "beforeModulesLoad",
//     ModulesLoaded = "modulesLoaded",
//     BeforeInjectorInit = "beforeInjectorInit",
//     InjectorInit = "injectorInit",
//     BeforeBootstrap = "beforeBootstrap",
//     Bootstrap = "bootstrap",
//     BeforeInjectRegister = "beforeInjectRegister",
//     InjectRegister = "injectRegister",
//     BeforeModuleInit = "beforeModuleInit",
//     ModuleInit = "moduleInit",
//     ModuleExport = "moduleExport",
//     ClassExport = "classExport",
//     Reset = "reset",
//     BeforeReset = "reset"
// }
