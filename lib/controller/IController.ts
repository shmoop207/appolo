import {IRequest,IResponse,NextFn} from "appolo-agent";

export interface IController{

}

export interface IControllerCtr {
    new (...args: any[]): IController
}