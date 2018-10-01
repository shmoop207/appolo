import {Events as AgentEvents} from "appolo-agent";
import {Events as EngineEvents} from "appolo-engine";

export enum AppEvents {


}

export type Events = AgentEvents | AppEvents | EngineEvents;
