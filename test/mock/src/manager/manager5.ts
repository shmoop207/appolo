"use strict";
import {define, singleton, inject, lazy,injectAlias} from '../../../../index' ;
import {Manager3} from "./manager3";
import {IHandler} from "../handlers/IHandler";
import * as _ from 'lodash'


@define()
@singleton()
@lazy()
export class Manager5 {

    @inject() manager3: Manager3
    @injectAlias("IHandler") handlers: IHandler[]

    public get name(): string {
        return this.constructor.name + _.sumBy(this.handlers, h => h.handle()).toString()
    }
}

