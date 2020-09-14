"use strict";
import { inject,define,singleton} from '@appolo/inject';


@define()
@singleton()
export class Manager2 {

    public get name(): string {
        return this.constructor.name
    }
}
