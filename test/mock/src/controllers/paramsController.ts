"use strict";
import {controller, Controller, del, get, inject, patch, put,IRequest,model} from '../../../../index';
import {Manager4} from "../manager/manager4";

@controller()
export class ParamsController extends Controller {

    @inject() manager4: Manager4;

    @get('/test/params/:name/:name2')
    @patch('/test/params/:name/:name2')
    @put('/test/params/:name/:name2')
    @get('/test/params/:name/test/:name2')
    test(req:IRequest, res,@model() model) {
        res.json({
            working: true,
            controllerName: this.route.controller,
            model: model,
            manager: this.manager4.name,
            name: req.params.name,
            name2: req.params.name2
        })
    }

    @get('/test/params/empty/:name/:name2')
    @del('/test/params/empty/:name/:name2')
    empty(req, res) {
        this.sendNoContent()
    }
}


// appolo.route<ParamsController>(ParamsController)
//     .path('/test/params/:name/:name2')
//     .method('get')
//     .action(c => c.test)
//     .validations('user_name', appolo.validator.string().required());
//
// appolo.route<ParamsController>(ParamsController)
//     .path('/test/params/:name/test/:name2')
//     .method('get')
//     .action(c => c.test)
//     .validations('user_name', appolo.validator.string().required());




