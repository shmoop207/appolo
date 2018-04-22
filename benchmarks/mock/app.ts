"use strict";
import appolo  = require('../../index');
import {IRequest, IResponse} from "../../index";


(async function () {
    let app = appolo.createApp({
        port: 3000,
        startMessage:"1",
        environment: "testing",
        root: process.cwd() + '/benchmarks/mock',
    })

    // app.get("/test/",(req, res) =>{
    //     res.send('hello world')
    // })

    await app.launch()
    //console.log("running appolo")
})()

