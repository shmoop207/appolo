"use strict";
import {}  from '../../../../index';
import {Manager3} from "./manager3";
import {Manager2} from "./manager2";
import { inject,define,singleton,override,lazy} from '@appolo/inject';

export class BaseManager {
    @inject() logger: any;
    @inject() env: any

}
