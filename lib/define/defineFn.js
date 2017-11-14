"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inject_1 = require("../inject/inject");
const _ = require("lodash");
const util_1 = require("../util/util");
const define_1 = require("./define");
let plugins = [];
function define($config, klass) {
    if (_.isString($config) || _.isFunction($config)) {
        return new define_1.Define($config, klass);
    }
    klass = klass || $config.type;
    let def = $config;
    //create namespace
    if (def.namespace) {
        util_1.Util.namespace(def.namespace, klass);
    }
    //create inject
    if (def.id) {
        def.type = klass;
        inject_1.default.addDefinition(def.id, def);
    }
    if (def.mixins) {
        util_1.Util.mixins(klass, def.mixins);
    }
    if (def.statics) {
        util_1.Util.statics(klass, def.statics);
    }
    //run on plugins
    _.forEach(plugins, (func) => {
        func($config, klass);
    });
}
exports.define = define;
exports.definePlugin = function (func) {
    plugins.push(func);
};
//# sourceMappingURL=defineFn.js.map