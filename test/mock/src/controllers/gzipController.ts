"use strict";
import {controller, inject, get, middleware, Controller, gzip,statusCode,header,customRouteDecorator} from '../../../../index';
import {TestMiddleware} from "../middleware/middleware";
import {AuthMiddleware} from "../middleware/authMiddleware";
import compression = require('compression')
import {Promises} from 'appolo-utils';

let someHeader =  customRouteDecorator((req,res,route)=>{
    res.setHeader("x-test2","222")
})

@controller()
export class GzipController extends Controller {
    @inject() manager: any;

    @get('/test/gzip_async')
    async gzipAsync(req, res) {

        await Promises.delay(10)

        res.gzip().json({working: true})
    }

    @get('/test/gzip')
    gzip(req, res) {
        res.gzip().json({working: true})
    }

    @get('/test/gzip/decorator')
    @gzip()
    @header("x-test","true")
    @someHeader
    @statusCode(201)
    gzipDecorator(req, res) {
        res.json({working: true})
    }


    @get('/test/compression')
    @middleware(compression({threshold: 512}))
    compression(req, res) {
        res.json({working: "dsadasnfkjdshfdhsfdgnfdkjgjfdbgjhbdjhbgjhfdbgbdfjhbgbdfbgjdsbgjbdjkhfgbkdfgkfiuthrehilhvbcdbvdsbjhbdsjfbjdsbfbdsbfhjdbfjhbdjsbfjdbfbdsafbjhdbsfjhgndfkgjlkdjgljdlsfjldksjflkdjsflkjdslkjfdjslfjdlksjfldsjlkfjdslkjflkdsjfljdslfjdsiroeiwrioewrejwcnvcnxvkjnckxjbkdbgkdskfdskfkdsfdsnfjdnsfldskfnkdsajfdksjnfjdksnfkjdsahfkjdhsfkdhsfkjhdksfhkjdsadbvcxmnvbdsbjhbdsjhfbdsbfhdfihiuhriehriuhewiuhshkbfkdshfkdksfhdsiuhfudshfdhskfhdkshfkdshfkhdsiufhdisuhfksgkdfhgkhdjkgdjhsgfjhsdjkfgsjkgfjhgdsakfgdjshgfjkdsgjfgsdjhgfdgjfgsdjhgfhjdsghjfgdshfjdhsjkfhkdsjhfkdhskfhkdshfjgdshhjfgdjshfvdsbcn sdmnvchjdsvfhsahjbfjhsdfbdsjbfjhdsb"})
    }



}
