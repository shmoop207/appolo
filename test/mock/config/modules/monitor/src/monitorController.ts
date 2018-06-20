import {Controller, controller, get, inject} from '../../../../../../index';
import {IEnv} from "../../../../config/env/IEnv";

@controller("test/monitor")
export class MonitorController extends Controller {


    @inject() env: IEnv;

    @get()
    public monitor() {
        return {ok: true, type: this.env.type}
    }
}