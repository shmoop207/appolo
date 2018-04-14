import {IResponse as IAgentResponse} from "appolo-agent";
import {IRequest} from "./IRequest";


export interface IResponse extends IAgentResponse {
    req: IRequest,
}