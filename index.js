"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const launcher_1 = require("./lib/launcher/launcher");
const modules_1 = require("./lib/modules/modules");
var util_1 = require("./lib/util/util");
exports.Util = util_1.Util;
var event_dispatcher_1 = require("./lib/events/event-dispatcher");
exports.EventDispatcher = event_dispatcher_1.EventDispatcher;
var launcher_2 = require("./lib/launcher/launcher");
exports.Launcher = launcher_2.Launcher;
exports.launcher = launcher_2.launcher;
var inject_1 = require("./lib/inject/inject");
exports.inject = inject_1.default;
var defineFn_1 = require("./lib/define/defineFn");
exports.define = defineFn_1.define;
exports.definePlugin = defineFn_1.definePlugin;
var define_1 = require("./lib/define/define");
exports.Define = define_1.Define;
var loader_1 = require("./lib/loader/loader");
exports.loader = loader_1.default;
exports.FilesLoader = loader_1.FilesLoader;
var environments_1 = require("./lib/environments/environments");
exports.environment = environments_1.default;
var modules_2 = require("./lib/modules/modules");
exports.module = modules_2.default;
var appolo_inject_1 = require("appolo-inject");
exports.Injector = appolo_inject_1.Injector;
exports.use = function (func) {
    modules_1.default.register(func);
};
exports.launch = function (config, callback) {
    return launcher_1.launcher.launch(config, callback);
};
//# sourceMappingURL=index.js.map