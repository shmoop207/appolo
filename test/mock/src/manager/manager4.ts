"use strict";
import {define, singleton, inject} from '../../../../index' ;
import {Manager3} from "./manager3";
import {BaseManager} from "./baseManager";


@define()
@singleton()
export class Manager4 extends BaseManager {

    @inject() manager3: Manager3

    public get name(): string {
        return this.constructor.name
    }
}

