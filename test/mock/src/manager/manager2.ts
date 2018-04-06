"use strict";
import {define, singleton} from '../../../../index';


@define()
@singleton()
export class Manager2 {

    public get name(): string {
        return this.constructor.name
    }
}
