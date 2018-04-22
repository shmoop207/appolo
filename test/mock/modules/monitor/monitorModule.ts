import {Module, module} from '../../../../index';
import {MonitorController} from "./src/monitorController";

@module({
    exports: [MonitorController]
})
export class MonitorModule extends Module {

}