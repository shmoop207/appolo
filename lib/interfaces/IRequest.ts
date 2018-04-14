import {IRequest as IAgentRequest} from "appolo-agent";
import {App} from "../app";
import {IRouteOptions} from "./IRouteOptions";


export interface IRequest extends IAgentRequest {
    app: App,
    route: IRouteOptions
}