"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const _path = require("path");
function decorate(req, res, app) {
    let old = res.render;
    res.render = function (path, params) {
        if (arguments.length == 1 && typeof path !== "string") {
            params = path;
            path = "";
        }
        if (!path && this.req.route) {
            path = _path.resolve(this.req.app.options.root, "src/controllers", this.req.route.controllerName, this.req.route.actionName);
        }
        let paths = _.isArray(path) ? path : [path];
        if (_.isString(path) && this.req.route) {
            paths.push(_path.resolve(this.req.app.options.root, "src/controllers", this.req.route.controllerName, path));
        }
        return old.call(this, paths, params);
    };
}
exports.decorate = decorate;
//# sourceMappingURL=decorate.js.map