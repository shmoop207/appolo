"use strict";
import {
    controller,
    define,
    singleton,
    lazy,
    StaticController,
    inject,
    get, model,
    IRequest,
    IResponse, pipelineType, IPipeline, PipelineContext, App, injectParam, Util, Controller
} from '../../../../index';
import {IEnv} from "../../config/env/IEnv";


@define()
@singleton()
export class TestPipeline implements IPipeline {

    constructor(@injectParam() private app: App, @injectParam() private env: IEnv) {
    }

    run(context: PipelineContext, next: () => Promise<any>) {

        let route = Util.createRouteDefinition(context.type, "testPipeline")

        route.path("/aaa")

        model()(context.type.prototype, "testPipeline", 0)

        context.type.prototype["testPipeline"] = function (this: Controller, model) {
            return model
        }

        return next();
    }

}


@controller("pipeline")
@singleton()
@pipelineType(TestPipeline)
export class PipelineTypeRouteController extends StaticController {


}






