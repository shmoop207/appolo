"use strict";
import {Controller, controller, define, inject, get, singleton} from '../../../../index';


@controller()
export class PromiseController extends Controller {
    @inject() manager: any;


    @get("test/promise")
    async test(req, res) {

        return {working: "working"}

    }

    @get("test/promise/error")
    async testError(req, res) {


        throw new Error("not working")


    }

}




