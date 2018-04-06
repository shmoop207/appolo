"use strict";
import {inject, define, bootstrap, singleton, IBootstrap} from "../../../index";
import {Manager} from "./manager/manager";
import * as Q from 'bluebird';

@define()
@bootstrap()
@singleton()
export class Bootstrap implements IBootstrap {

    @inject() manager: Manager

    working: boolean;

    public async run() {
        this.working = true;

        await Q.delay(10);

    }
}
