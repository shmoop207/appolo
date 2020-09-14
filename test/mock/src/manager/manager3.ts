"use strict";
import {Manager2} from "./manager2";
import { inject,define,singleton} from '@appolo/inject';

@define()
@singleton()
export class Manager3 {
    @inject() manager2: Manager2;
    TEST: number = 1

    public get name(): string {
        return this.constructor.name
    }
}

