"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo = require("appolo-engine");
const _ = require("lodash");
class Util extends appolo.Util {
    static convertSnakeCaseToCamelCase(str) {
        return str.replace(/(\_\w)/g, function (m) {
            return m[1].toUpperCase();
        });
    }
    static convertModelToCamelCase(model) {
        let keys = Object.keys(model);
        let output = {};
        for (let i = 0, len = keys.length; i < len; i++) {
            let key = keys[i];
            output[Util.convertSnakeCaseToCamelCase(key)] = model[key];
        }
        return output;
    }
    static isClass(v) {
        return typeof v === 'function' && v.name && /^\s*class\s+/.test(v.toString());
    }
    static reverseMiddleware(route) {
        _.forEach(route, (value, key) => {
            //we need to insert middlewares in reverse order
            if (key == "middleware") {
                route[key] = {
                    middleware: _.isArray(value) ? value.reverse() : value,
                    order: "head"
                };
            }
        });
    }
    static getControllerName(controller) {
        return _.isFunction(controller) && controller.name ? _.camelCase(controller.name) : controller;
    }
}
exports.Util = Util;
//# sourceMappingURL=util.js.map