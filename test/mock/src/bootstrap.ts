"use strict";
import {Manager} from "./manager/manager";
import {Promises} from '@appolo/utils';
import { inject,define,singleton,override} from '@appolo/inject';
import { bootstrap,IBootstrap} from '@appolo/engine';

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
