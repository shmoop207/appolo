"use strict";
import {inject, define, bootstrap, singleton, IBootstrap, override, Util} from "../../../index";
import {Manager} from "./manager/manager";
import {Promises} from 'appolo-utils';

@define()
@bootstrap()
@singleton()
@override()
export class Bootstrap implements IBootstrap {

    @inject() manager: Manager;

    working: boolean;

    public async run() {
        this.working = true;

        await Promises.delay(10);

    }
}
