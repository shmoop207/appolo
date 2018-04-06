"use strict";
import {inject}  from '../../../../index';
import {Manager3} from "./manager3";
import {Manager2} from "./manager2";

export class BaseManager {
    @inject() logger: any;
    @inject() env: any

}
