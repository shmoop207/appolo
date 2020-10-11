"use strict";
import {Controller, controller, get,BadRequestError} from '@appolo/route';
import { inject,define,singleton,override,lazy} from '@appolo/inject';


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

    @get("test/promise/no_error")
    testErrorNoPromise(req, res) {


        throw new BadRequestError("not working",{a:1},123)


    }

}




