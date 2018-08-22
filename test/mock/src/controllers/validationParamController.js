"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
const routeModel_1 = require("../../../../lib/routes/routeModel");
class ValidationModel extends routeModel_1.RouteModel {
}
tslib_1.__decorate([
    index_1.validationParam(index_1.validator.string().required())
], ValidationModel.prototype, "test", void 0);
tslib_1.__decorate([
    index_1.validationParam(index_1.validator.number().required())
], ValidationModel.prototype, "test2", void 0);
class Validation2Model extends ValidationModel {
}
tslib_1.__decorate([
    index_1.validationParam(index_1.validator.string().required())
], Validation2Model.prototype, "id", void 0);
let ValidationParamController = class ValidationParamController extends index_1.Controller {
    validation(req, res) {
        let model = this.getModel();
        res.json({ test: model.test, name: this.constructor.name });
    }
    validation2(req, res, model, route) {
        res.json({ test: model.test, id: model.id, name: this.constructor.name });
    }
    validation3(req, res, model, route) {
        res.json({ test: model.test, id: model.id, name: this.constructor.name, working: req.model.working });
    }
};
tslib_1.__decorate([
    index_1.get('/test/validations/param'),
    index_1.validation(ValidationModel)
], ValidationParamController.prototype, "validation", null);
tslib_1.__decorate([
    index_1.get('/test/validations/param2'),
    index_1.validation(Validation2Model)
], ValidationParamController.prototype, "validation2", null);
tslib_1.__decorate([
    index_1.post('/test/validations/param2'),
    index_1.validation(Validation2Model),
    index_1.middleware((function (req, res, next) {
        req.model.working = "true";
        next();
    }))
], ValidationParamController.prototype, "validation3", null);
ValidationParamController = tslib_1.__decorate([
    index_1.controller()
], ValidationParamController);
exports.ValidationParamController = ValidationParamController;
//# sourceMappingURL=validationParamController.js.map