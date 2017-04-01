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
    //create namespace
    if ($config.namespace) {
        util_1.Util.namespace($config.namespace, klass);
    }
    //create inject
    if ($config.id) {
        $config.type = klass;
        inject_1.default.addDefinition($config.id, $config);
    }
    if ($config.mixins) {
        util_1.Util.mixins(klass, $config.mixins);
    }
    if ($config.statics) {
        util_1.Util.statics(klass, $config.statics);
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
//# sourceMappingURL=definefn.js.map