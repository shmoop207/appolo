"use strict";
import {Manager2} from "./manager2";
import {define, singleton, inject} from '../../../../index';

@define()
@singleton()
export class Manager3 {
    @inject() manager2: Manager2;
    TEST: number

    public get name(): string {
        return this.constructor.name
    }
}

