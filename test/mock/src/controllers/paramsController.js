"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamsController = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
let ParamsController = class ParamsController extends index_1.Controller {
    test(req, res, model) {
        res.json({
            working: true,
            controllerName: this.route.controller,
            model: model,
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
    index_1.get('/test/params/:name/:name2'),
    index_1.patch('/test/params/:name/:name2'),
    index_1.put('/test/params/:name/:name2'),
    index_1.get('/test/params/:name/test/:name2'),
    tslib_1.__param(2, index_1.model())
], ParamsController.prototype, "test", null);
tslib_1.__decorate([
    index_1.get('/test/params/empty/:name/:name2'),
    index_1.del('/test/params/empty/:name/:name2')
], ParamsController.prototype, "empty", null);
ParamsController = tslib_1.__decorate([
    index_1.controller()
], ParamsController);
exports.ParamsController = ParamsController;
//# sourceMappingURL=paramsController.js.map