import {IOptions} from "./lib/interfaces/IOptions";
import {App} from "./lib/app";
import {IApp} from "./lib/interfaces/IApp";


export {IApp}

export {App} from './lib/app';
export {Discovery} from './lib/discovery/discovery';
export {Events} from './lib/interfaces/events';
export {IEnv} from './lib/interfaces/IEnv';


export {IOptions} from "./lib/interfaces/IOptions";


export function createApp(options?: IOptions): App {
    return new App(options)
}

export default function (options?: IOptions): App {
    return new App(options)
};





