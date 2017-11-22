import {launcher} from './lib/launcher/launcher';
import moduleManager, {ModuleFn} from './lib/modules/modules';
import {IOptions} from "./lib/IOptions";

export {Util} from "./lib/util/util"
export {EventDispatcher} from './lib/events/event-dispatcher';
export {Launcher, launcher} from './lib/launcher/launcher';
export {default as inject} from './lib/inject/inject';
export {define, definePlugin} from './lib/define/defineFn';
export {Define} from './lib/define/define';
export {default as  loader, FilesLoader} from './lib/loader/loader';
export {default as environment} from './lib/environments/environments'
export {default as module} from './lib/modules/modules'

export {IOptions} from './lib/IOptions'
export {IBootstrap} from './lib/IBootstrap'
export {IEnv} from './lib/IEnv'
export {IDefinition} from './lib/IDefinition'
export {Injector, IFactory} from 'appolo-inject'

export let use = function (func: (...args: any[]) => void, async: boolean = false) {
    moduleManager.register(func, async);
};
export let load = function (func: (...args: any[]) => Promise<any>): PromiseLike<any> {
    return moduleManager.load(func);
};
export let launch = function (config: IOptions, callback?: Function): Promise<void> {
    return launcher.launch(config, callback);
};





