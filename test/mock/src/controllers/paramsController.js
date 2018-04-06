"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let ParamsController = class ParamsController extends index_1.Controller {
    test(req, res) {
        res.json({
            working: true,
            controllerName: this.route.controller,
            model: req.model,
            manager: this.manager4.name,
            name: req.params.name,
            name2: req.params.name2
        });
    }
    empty(req, res) {
        this.sendNoContent();
    }
};
tslib_1.__decorate([
    index_1.inject()
], ParamsController.prototype, "manager4", void 0);
tslib_1.__decorate([
    index_1.pathGet('/test/params/:name/:name2'),
    index_1.pathGet('/test/params/:name/test/:name2'),
    index_1.validation("userName", index_1.validator.string().required())
], ParamsController.prototype, "test", null);
tslib_1.__decorate([
    index_1.pathGet('/test/params/empty/:name/:name2'),
    index_1.validation("userName", index_1.validator.string().required())
], ParamsController.prototype, "empty", null);
ParamsController = tslib_1.__decorate([
    index_1.define()
], ParamsController);
exports.ParamsController = ParamsController;
//# sourceMappingURL=paramsController.js.map