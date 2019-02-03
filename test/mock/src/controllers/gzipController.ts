"use strict";
import {controller, inject, get, middleware, Controller, gzip} from '../../../../index';
import {TestMiddleware} from "../middleware/middleware";
import {AuthMiddleware} from "../middleware/authMiddleware";
import compression = require('compression')
import Q = require('bluebird')


@controller()
export class GzipController extends Controller {
    @inject() manager: any;

    @get('/test/gzip_async')
    async gzipAsync(req, res) {

        await Q.delay(10)

        res.gzip().json({working: true})
    }

    @get('/test/gzip')
    gzip(req, res) {
        res.gzip().json({working: true})
    }

    @get('/test/gzip/decorator')
    @gzip()
    gzipDecorator(req, res) {
        res.json({working: true})
    }


    @get('/test/compression')
    @middleware(compression({threshold: 512}))
    compression(req, res) {
        res.json({working: "dsadasnfkjdshfdhsfdgnfdkjgjfdbgjhbdjhbgjhfdbgbdfjhbgbdfbgjdsbgjbdjkhfgbkdfgkfiuthrehilhvbcdbvdsbjhbdsjfbjdsbfbdsbfhjdbfjhbdjsbfjdbfbdsafbjhdbsfjhgndfkgjlkdjgljdlsfjldksjflkdjsflkjdslkjfdjslfjdlksjfldsjlkfjdslkjflkdsjfljdslfjdsiroeiwrioewrejwcnvcnxvkjnckxjbkdbgkdskfdskfkdsfdsnfjdnsfldskfnkdsajfdksjnfjdksnfkjdsahfkjdhsfkdhsfkjhdksfhkjdsadbvcxmnvbdsbjhbdsjhfbdsbfhdfihiuhriehriuhewiuhshkbfkdshfkdksfhdsiuhfudshfdhskfhdkshfkdshfkhdsiufhdisuhfksgkdfhgkhdjkgdjhsgfjhsdjkfgsjkgfjhgdsakfgdjshgfjkdsgjfgsdjhgfdgjfgsdjhgfhjdsghjfgdshfjdhsjkfhkdsjhfkdhskfhkdshfjgdshhjfgdjshfvdsbcn sdmnvchjdsvfhsahjbfjhsdfbdsjbfjhdsb"})
    }

}
