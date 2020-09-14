"use strict";
import {} from '../../../../index' ;
import {Manager3} from "./manager3";
import {BaseManager} from "./baseManager";
import { inject,define,singleton,override,lazy,injectParam} from '@appolo/inject';


@define()
@singleton()
export class Manager4 extends BaseManager {

    @inject() manager3: Manager3

    public get name(): string {
        return this.constructor.name
    }
}

