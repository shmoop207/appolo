"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = exports.Events = exports.Discovery = exports.App = void 0;
const app_1 = require("./lib/app");
var app_2 = require("./lib/app");
Object.defineProperty(exports, "App", { enumerable: true, get: function () { return app_2.App; } });
var discovery_1 = require("./lib/discovery/discovery");
Object.defineProperty(exports, "Discovery", { enumerable: true, get: function () { return discovery_1.Discovery; } });
var events_1 = require("./lib/interfaces/events");
Object.defineProperty(exports, "Events", { enumerable: true, get: function () { return events_1.Events; } });
function createApp(options) {
    return new app_1.App(options);
}
exports.createApp = createApp;
function default_1(options) {
    return new app_1.App(options);
}
exports.default = default_1;
;
//# sourceMappingURL=index.js.map