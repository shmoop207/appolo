"use strict";
import {Manager3} from "./manager3";
import {BaseManager} from "./baseManager";
import {Manager4} from "./manager4";
import {Manager5} from "./manager5";
import { inject,define,singleton,override,lazy,init} from '@appolo/inject';


@define()
@singleton()
export class Manager6 extends BaseManager {

    @inject() manager4: Manager4;

    @init()
    initialize() {

    }

    public get name(): string {
        return this.constructor.name
    }
}

