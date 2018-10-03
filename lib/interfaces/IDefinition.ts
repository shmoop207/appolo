import {App} from "../app";

export type Class = { new(...args: any[]): any; };

export type Plugin = (app:App,ops:any)=>Promise<any>