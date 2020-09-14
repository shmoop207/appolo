"use strict";
import {
    controller,
    StaticController,
    get, model,
    IRequest,
    IResponse, Util, Controller
} from '@appolo/route';
import {IEnv} from "../../config/env/IEnv";
import {inject, define, singleton, override, lazy, injectParam} from '@appolo/inject';
import {pipelineType, IPipeline, PipelineContext} from '@appolo/engine';
import {App} from '../../../../index';


@define()
@singleton()
export class TestPipeline implements IPipeline {

    constructor(@injectParam() private app: App, @injectParam() private env: IEnv) {
    }

    run(context: PipelineContext, next: () => Promise<any>) {

        let route = this.app.discovery.createRouteDefinition(context.type, "testPipeline")

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






