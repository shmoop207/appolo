import {} from '../../../../../index';
import {MonitorController} from "./src/monitorController";
import {Module, module} from "@appolo/engine";

@module({
    exports: [MonitorController]
})
export class MonitorModule extends Module {

}
