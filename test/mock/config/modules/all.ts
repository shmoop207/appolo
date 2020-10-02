import {logger} from './logger';
import {logger2} from './logger2';
import {logger3} from './logger3';
import {App} from "../../../../index";
import {MonitorModule} from "./monitor/monitorModule";

export = async function (env, app: App) {

    await app.module(logger)

    await app.module(logger2({test: 'test'}));

    await app.modules(logger3({test: 'test3'}), MonitorModule)
}
