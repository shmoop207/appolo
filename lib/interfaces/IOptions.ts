import {IOptions as IEngineOptions} from 'appolo-engine';
import { ValidationOptions } from 'joi';

export interface IOptions extends IEngineOptions {

    startMessage?: string,
    startServer?: boolean,
    port?: number,
    environment?: string
    errorStack?: boolean
    errorMessage?: boolean
    maxRouteCache?: number
    qsParser?: "qs" | "querystring"
    urlParser?: "url" | "fast"
    viewFolder?: string
    viewEngine?: (path: string, options?: { cache?: boolean, [otherOptions: string]: any }) => Promise<string>;
    viewExt?: string
    ssl?: {
        key: string
        cert: string
    }
    validatorOptions?: ValidationOptions
}