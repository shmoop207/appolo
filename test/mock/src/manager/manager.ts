"use strict";
import {Manager3} from "./manager3";
import {Manager2} from "./manager2";
import * as Q from "bluebird";
import {define, singleton, inject,Context} from '../../../../index';

@define()
@singleton()
export class Manager {
    @inject() manager2: Manager2;
    @inject() manager3: Manager3;

    @inject() context: Context;

    public get name(): string {
        return this.constructor.name
    }

    public async getContextName():Promise<string>{
        Q.delay(1);
        return this.context.get("user")
    }
}

