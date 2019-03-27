import {logger} from './logger';
import {logger2} from './logger2';
import {logger3} from './logger3';
import {App, Methods, Util} from "../../../../index";
import {MonitorModule} from "./monitor/monitorModule";
import {Hooks} from "appolo-agent/lib/types";
import {HooksController} from "../../src/controllers/hooksController";

export = async function (env, app: App) {

    app.enableContext();


    let route = Util.getRouteDefinition<HooksController>(HooksController,c=>c.hooks);

    route.addHook(Hooks.PreMiddleware, function (req,res,next) {
        req.model = {...req.model, a:11};

        next();
    });

    await app.module(logger)

    await app.module(logger2({test: 'test'}));

    await app.module(logger3({test: 'test3'}), MonitorModule)
}
