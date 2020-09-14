"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineTypeRouteController = exports.TestPipeline = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
const engine_1 = require("@appolo/engine");
let TestPipeline = class TestPipeline {
    constructor(app, env) {
        this.app = app;
        this.env = env;
    }
    run(context, next) {
        let route = this.app.discovery.createRouteDefinition(context.type, "testPipeline");
        route.path("/aaa");
        route_1.model()(context.type.prototype, "testPipeline", 0);
        context.type.prototype["testPipeline"] = function (model) {
            return model;
        };
        return next();
    }
};
TestPipeline = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton(),
    tslib_1.__param(0, inject_1.injectParam()), tslib_1.__param(1, inject_1.injectParam())
], TestPipeline);
exports.TestPipeline = TestPipeline;
let PipelineTypeRouteController = class PipelineTypeRouteController extends route_1.StaticController {
};
PipelineTypeRouteController = tslib_1.__decorate([
    route_1.controller("pipeline"),
    inject_1.singleton(),
    engine_1.pipelineType(TestPipeline)
], PipelineTypeRouteController);
exports.PipelineTypeRouteController = PipelineTypeRouteController;
//# sourceMappingURL=pipelineTypeRouteController.js.map