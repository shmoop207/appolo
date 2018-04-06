"use strict";
import appolo  = require('../../index');


let app = appolo.createApp({
    port: 3000,
    environment: "testing",
    root: process.cwd() + '/benchmarks/mock',
})

app.launch()

