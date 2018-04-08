"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo = require("appolo-engine");
class Util extends appolo.Util {
    //private static readonly UrlRegex: RegExp = /^(\/\/?(?!\/)[^?#\s]*)(\?[^#\s]*)?$/
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
    // public static getAllPropertyNames(obj) {
    //     var props = [];
    //
    //     do {
    //         if (obj.prototype) {
    //             props = props.concat(Object.getOwnPropertyNames(obj.prototype));
    //         }
    //
    //     } while (obj = Object.getPrototypeOf(obj));
    //
    //     return props;
    // }
    static isClass(v) {
        return typeof v === 'function' && v.name && /^\s*class\s+/.test(v.toString());
    }
}
exports.Util = Util;
//# sourceMappingURL=util.js.map