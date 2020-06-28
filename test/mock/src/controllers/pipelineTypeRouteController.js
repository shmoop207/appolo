"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineTypeRouteController = exports.TestPipeline = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let TestPipeline = class TestPipeline {
    constructor(app, env) {
        this.app = app;
        this.env = env;
    }
    run(context, next) {
        let route = index_1.Util.createRouteDefinition(context.type, "testPipeline");
        route.path("/aaa");
        index_1.model()(context.type.prototype, "testPipeline", 0);
        context.type.prototype["testPipeline"] = function (model) {
            return model;
        };
        return next();
    }
};
TestPipeline = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton(),
    tslib_1.__param(0, index_1.injectParam()), tslib_1.__param(1, index_1.injectParam())
], TestPipeline);
exports.TestPipeline = TestPipeline;
let PipelineTypeRouteController = class PipelineTypeRouteController extends index_1.StaticController {
};
PipelineTypeRouteController = tslib_1.__decorate([
    index_1.controller("pipeline"),
    index_1.singleton(),
    index_1.pipelineType(TestPipeline)
], PipelineTypeRouteController);
exports.PipelineTypeRouteController = PipelineTypeRouteController;
//# sourceMappingURL=pipelineTypeRouteController.js.map