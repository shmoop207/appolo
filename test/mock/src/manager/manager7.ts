"use strict";
import {define, initMethod, inject, injectFactoryMethod, singleton} from '../../../../index';
import {BaseManager} from "./baseManager";
import {Manager4} from "./manager4";


@define()
@singleton()
export class Manager7 extends BaseManager {

    @inject() manager4: Manager4;

    protected _initCount = 0;

    @initMethod()
    initialize() {
        this._initCount++;
    }

    public get name(): string {
        return this.constructor.name
    }

    public get initCout(): number {
        return this._initCount
    }
}

