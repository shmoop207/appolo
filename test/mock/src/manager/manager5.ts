"use strict";
import {} from '../../../../index' ;
import {Manager3} from "./manager3";
import {IHandler} from "../handlers/IHandler";
import {Arrays} from "@appolo/utils";
import { inject,define,singleton,override,lazy,injectParam,injectAlias} from '@appolo/inject';


@define()
@singleton()
@lazy()
export class Manager5 {

    @inject() manager3: Manager3
    @injectAlias("IHandler") handlers: IHandler[]

    public get name(): string {
        return this.constructor.name + Arrays.sumBy(this.handlers, h => h.handle()).toString()
    }
}

