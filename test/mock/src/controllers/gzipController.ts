"use strict";
import {define, inject, pathGet, middleware, Controller} from '../../../../index';
import {TestMiddleware} from "../middleware/middleware";
import {AuthMiddleware} from "../middleware/authMiddleware";
import compression = require('compression')


@define()
export class GzipController extends Controller {
    @inject() manager: any;

    @pathGet('/test/gzip')
    gzip(req, res) {
        res.gzip().json({working: true})
    }

    @pathGet('/test/compression')
    @middleware(compression({threshold: 512}))
    compression(req, res) {
        res.json({working: "dsadasnfkjdshfdhsfdgnfdkjgjfdbgjhbdjhbgjhfdbgbdfjhbgbdfbgjdsbgjbdjkhfgbkdfgkfiuthrehilhvbcdbvdsbjhbdsjfbjdsbfbdsbfhjdbfjhbdjsbfjdbfbdsafbjhdbsfjhgndfkgjlkdjgljdlsfjldksjflkdjsflkjdslkjfdjslfjdlksjfldsjlkfjdslkjflkdsjfljdslfjdsiroeiwrioewrejwcnvcnxvkjnckxjbkdbgkdskfdskfkdsfdsnfjdnsfldskfnkdsajfdksjnfjdksnfkjdsahfkjdhsfkdhsfkjhdksfhkjdsadbvcxmnvbdsbjhbdsjhfbdsbfhdfihiuhriehriuhewiuhshkbfkdshfkdksfhdsiuhfudshfdhskfhdkshfkdshfkhdsiufhdisuhfksgkdfhgkhdjkgdjhsgfjhsdjkfgsjkgfjhgdsakfgdjshgfjkdsgjfgsdjhgfdgjfgsdjhgfhjdsghjfgdshfjdhsjkfhkdsjhfkdhskfhkdshfjgdshhjfgdjshfvdsbcn sdmnvchjdsvfhsahjbfjhsdfbdsjbfjhdsb"})
    }

}
