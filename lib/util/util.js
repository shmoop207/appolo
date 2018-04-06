"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo = require("appolo-engine");
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
    static getAllPropertyNames(obj) {
        var props = [];
        do {
            if (obj.prototype) {
                props = props.concat(Object.getOwnPropertyNames(obj.prototype));
            }
        } while (obj = Object.getPrototypeOf(obj));
        return props;
    }
    static isClass(v) {
        return typeof v === 'function' && v.name && /^\s*class\s+/.test(v.toString());
    }
    static decodeParam(val) {
        if (typeof val !== 'string' || val.length === 0) {
            return val;
        }
        try {
            return decodeURIComponent(val);
        }
        catch (err) {
            if (err instanceof URIError) {
                err.message = `Failed to decode param ${val}`;
                throw err;
            }
        }
    }
    static mixinProperties(obj, proto, keys) {
        keys = keys || Object.keys(proto);
        for (let i = 0, l = keys.length; i < l; i++) {
            let prop = keys[i];
            obj[prop] = proto[prop];
        }
        return obj;
    }
    // public static parseUrl(str: string): { pathName: string, query: string } {
    //     let match = this.UrlRegex.exec(str);
    //     if (match) {
    //         let pathName = match[1];
    //         let query = match[2] || "";
    //         if (query) {
    //             query = query.substring(1)
    //         }
    //         return {pathName, query}
    //     }
    //     let parsed = url.parse(str);
    //     return {
    //         pathName: parsed.pathname,
    //         query: parsed.query
    //     }
    //
    // }
    static parseUrlFast(str) {
        let index = str.indexOf('?');
        if (index > -1) {
            let pathname = str.substring(0, index);
            let query = str.substring(index + 1);
            return { query, pathname };
        }
        else {
            return { pathname: str, query: "" };
        }
    }
    static parseQsFast(url) {
        let vars = {}, hash;
        let hashes = (url || "").split('&');
        for (let i = 0, length = hashes.length; i < length; i++) {
            let hash = hashes[i], equalsIndex = hash.indexOf('='), key = hash.substring(0, equalsIndex), value = hash.substring(equalsIndex + 1);
            let bracketEnd = key.length - 1;
            if (key.charCodeAt(bracketEnd) == 93) {
                let bracketStart = key.indexOf("[");
                let nestedKey = key.substring(0, bracketStart), nestedKeyValue = key.substring(bracketStart + 1, bracketEnd);
                let arr = vars[nestedKey] || (vars[nestedKey] = []);
                arr[nestedKeyValue === "" ? arr.length : nestedKeyValue] = Util.decodeParamSafe(value);
            }
            else {
                vars[key] = Util.decodeParamSafe(value);
            }
        }
        return vars;
    }
    static decodeParamSafe(str) {
        try {
            return decodeURIComponent(str);
        }
        catch (e) {
            return str;
        }
    }
}
Util.UrlRegex = /^(\/\/?(?!\/)[^?#\s]*)(\?[^#\s]*)?$/;
Util.addSlashEnd = (str) => {
    if (str[str.length - 1] != "/") {
        return str += "/";
    }
    return str;
};
Util.addSlashEndFast = (str) => {
    if (str.charCodeAt(str.length - 1) != 47) {
        return str += "/";
    }
    return str;
};
exports.Util = Util;
//# sourceMappingURL=util.js.map