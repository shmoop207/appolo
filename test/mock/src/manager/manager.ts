"use strict";
import {Manager3} from "./manager3";
import {Manager2} from "./manager2";
import {define, singleton, inject} from '../../../../index';

@define()
@singleton()
export class Manager {
    @inject() manager2: Manager2;
    @inject() manager3: Manager3;

    public get name(): string {
        return this.constructor.name
    }
}

