import {IResponse} from "../interfaces/IResponse";
import {IRequest} from "../interfaces/IRequest";
import {Strings} from 'appolo-utils';
import    _path = require('path');

export function decorate(req: IRequest, res: IResponse, app: any) {

    let old = res.render;

    res.render = function (path: string | string[], params?: any): Promise<void> {

        if (arguments.length == 1 && typeof path !== "string") {
            params = path;
            path = "";
        }

        if (!path && this.req.route) {
            path = _path.resolve(this.req.app.options.root, "src/controllers", this.req.route.controllerName, this.req.route.actionName);
        }

        let paths = Array.isArray(path) ? path : [path];

        if (Strings.isString(path) && this.req.route) {
            paths.push(_path.resolve(this.req.app.options.root, "src/controllers", this.req.route.controllerName, path as string))
        }
        return old.call(this, paths, params)
    }
}
