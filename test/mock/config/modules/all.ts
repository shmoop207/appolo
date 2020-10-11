import {logger} from './logger';
import {logger2} from './logger2';
import {logger3} from './logger3';
import {App} from "../../../../index";
import {MonitorModule} from "./monitor/monitorModule";
import {TestModule} from "./test/testModule";

export = async function (env, app: App) {

    await app.module.loadFn(logger)

    await app.module.loadFn(logger2({test: 'test'}), logger3({test: 'test3'}));

    app.module.use(MonitorModule)
        .use(TestModule)
}
