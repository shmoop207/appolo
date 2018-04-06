"use strict";
import {define, singleton, inject, initMethod, injectFactoryMethod} from '../../../../index' ;
import {Manager3} from "./manager3";
import {BaseManager} from "./baseManager";
import {Manager4} from "./manager4";
import {Manager5} from "./manager5";


@define()
@singleton()
export class Manager6 extends BaseManager {

    @inject() manager4: Manager4;

    @initMethod()
    initialize() {

    }

    public get name(): string {
        return this.constructor.name
    }
}

