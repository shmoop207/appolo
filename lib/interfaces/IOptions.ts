import {IOptions as IEngineOptions} from '@appolo/engine';
import {IOptions as IAgentOptions} from '@appolo/agent';

export interface IOptions extends IEngineOptions,IAgentOptions {

    startMessage?: string,
    startServer?: boolean,
    port?: number,
    environment?: string
    errorStack?: boolean
    errorMessage?: boolean
    decodeUrlParams?:boolean
    maxRouteCache?: number
    urlParser?: "url" | "fast"
    trustProxy?:boolean
    ssl?: {
        key: string
        cert: string
    }
}
