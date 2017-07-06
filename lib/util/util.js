"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class Util {
    static getFunctionArgs(func) {
        const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        const ARGUMENT_NAMES = /([^\s,]+)/g;
        let fnStr = func.toString().replace(STRIP_COMMENTS, '');
        let args = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if (args === null) {
            args = [];
        }
        _.remove(args, function (arg) {
            return (arg == "" || arg == undefined || arg == null);
        });
        return args;
    }
    static namespace(namespace, value) {
        let properties = namespace.split('.');
        let parent = global;
        while (properties.length) {
            let property = properties.shift();
            if (typeof parent[property] === 'undefined') {
                parent[property] = {};
            }
            if (properties.length == 0 && value) {
                parent[property] = value;
            }
            else {
                parent = parent[property];
            }
        }
        return parent;
    }
    static mixins(_klass, mixins) {
        _.forEach(_.isArray(mixins) ? mixins : [mixins], (mixin) => {
            _(Object.getOwnPropertyNames(mixin.prototype))
                .without("constructor")
                .forEach(name => _klass.prototype[name] = mixin.prototype[name]);
        });
    }
    static statics(_klass, key, value) {
        let statics = {};
        if (value) {
            statics[key] = value;
        }
        else {
            statics = key;
        }
        _.forEach(statics, (func, name) => {
            Object.defineProperty(_klass, name, {
                get: function () {
                    return func;
                }
            });
            Object.defineProperty(_klass.prototype, name, {
                get: function () {
                    return func;
                }
            });
        });
    }
    static cloneArr(a) {
        let b = new Array(a.length);
        let i = a.length;
        while (i--) {
            b[i] = a[i];
        }
        return b;
    }
}
exports.Util = Util;
//# sourceMappingURL=util.js.map