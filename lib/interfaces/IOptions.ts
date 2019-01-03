import {IOptions as IEngineOptions} from 'appolo-engine';
import {IOptions as IAgentOptions} from 'appolo-agent';
import { ValidationOptions } from 'joi';

export interface IOptions extends IEngineOptions,IAgentOptions {

    startMessage?: string,
    startServer?: boolean,
    port?: number,
    environment?: string
    errorStack?: boolean
    errorMessage?: boolean
    decodeUrlParams?:boolean
    maxRouteCache?: number
    qsParser?: "qs" | "querystring"
    urlParser?: "url" | "fast"
    viewFolder?: string
    viewCache?: boolean
    trustProxy?:boolean
    viewEngine?: (path: string, options?: { cache?: boolean, [otherOptions: string]: any }) => Promise<string>;
    viewExt?: string
    ssl?: {
        key: string
        cert: string
    }
    validatorOptions?: ValidationOptions
}