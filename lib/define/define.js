"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const inject_1 = require("../inject/inject");
const appolo_inject_1 = require("appolo-inject");
const util_1 = require("../util/util");
class Define extends appolo_inject_1.Define {
    constructor($config, klass) {
        if (_.isString($config)) {
            super(inject_1.default, $config, klass);
            this._klass = klass;
        }
        else {
            super(inject_1.default, null);
            this._klass = _.isFunction($config) ? $config : (klass || $config.type);
        }
    }
    namespace(namespace) {
        if (!this._klass) {
            throw new Error("type is not defined for " + namespace);
        }
        util_1.Util.namespace(namespace, this._klass);
        return this;
    }
    statics(key, value) {
        if (!this._klass) {
            throw new Error("type is not defined");
        }
        util_1.Util.statics(this._klass, key, value);
        return this;
    }
    mixins(mixins) {
        if (!this._klass) {
            throw new Error("type is not defined");
        }
        util_1.Util.mixins(this._klass, mixins);
        return this;
    }
    type(type) {
        this._klass = type;
        super.type(type);
        return this;
    }
}
exports.Define = Define;
//# sourceMappingURL=define.js.map