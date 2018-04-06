"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo = require("../../index");
let app = appolo.createApp({
    port: 3000,
    environment: "testing",
    root: process.cwd() + '/benchmarks/mock',
});
app.launch();
//# sourceMappingURL=app.js.map