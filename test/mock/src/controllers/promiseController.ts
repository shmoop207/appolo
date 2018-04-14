"use strict";
import {Controller, controller, define, inject, path, singleton} from '../../../../index';


@controller()
export class PromiseController extends Controller {
    @inject() manager: any;


    @path("test/promise")
    async test(req, res) {

        return {working: "working"}

    }

    @path("test/promise/error")
    async testError(req, res) {

        throw new Error("not working")


    }

}




