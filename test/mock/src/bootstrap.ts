"use strict";
import {inject, define, bootstrap, singleton, IBootstrap, override, Util} from "../../../index";
import {Manager} from "./manager/manager";
import * as Q from 'bluebird';
import {HooksController} from "./controllers/hooksController";
import {Hooks} from "appolo-agent/lib/types";

@define()
@bootstrap()
@singleton()
@override()
export class Bootstrap implements IBootstrap {

    @inject() manager: Manager

    working: boolean;

    public async run() {
        this.working = true;

        await Q.delay(10);

    }
}
