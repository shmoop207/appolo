"use strict";
import appolo  = require('../../index');


(async function () {
    let app = appolo.createApp({
        port: 3000,
        environment: "testing",
        root: process.cwd() + '/benchmarks/mock',
    })

    await app.launch()
    console.log("running appolo")
})()

