import {Controller, controller, get} from '@appolo/route';
import {IEnv} from "../../../../config/env/IEnv";
import {inject} from "@appolo/inject";

@controller("test/monitor")
export class MonitorController extends Controller {


    @inject() env: IEnv;

    @get()
    public monitor() {
        return {ok: true, type: this.env.type}
    }
}
