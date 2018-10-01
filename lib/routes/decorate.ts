import {App} from "../app";
import    http = require('http');
import    _ = require('lodash');
import    _path = require('path');
import {IResponse} from "../interfaces/IResponse";
import {IRequest} from "../interfaces/IRequest";

export function decorate(req:IRequest , res: IResponse, app: any){

    let old = res.render;

    res.render = function (path: string | string[], params?: any): Promise<void> {

        if (arguments.length == 1 && typeof path !== "string") {
            params = path;
            path = "";
        }

        if (!path) {
            path = _path.resolve(this.req.app.options.root, "src/controllers", this.req.route.controllerName, this.req.route.actionName);
        }

        let paths = _.isArray(path) ? path : [path];

        if (_.isString(path)) {
            paths.push(_path.resolve(this.req.app.options.root, "src/controllers", this.req.route.controllerName, path))
        }
        return old.call(this, paths, params)
    }
}
