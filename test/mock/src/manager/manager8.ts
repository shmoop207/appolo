"use strict";
import {} from '../../../../index' ;
import {Manager3} from "./manager3";
import {BaseManager} from "./baseManager";
import {Manager4} from "./manager4";
import {Manager5} from "./manager5";
import {Manager7} from "./manager7";
import {Manager6} from "./manager6";

import { inject,define,singleton,override,lazy,injectParam} from '@appolo/inject';

@define()
@singleton()
export class Manager8 extends Manager7 {

    @inject() manager6: Manager6;


    public get name(): string {
        return this.constructor.name
    }
}

