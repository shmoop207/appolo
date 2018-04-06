"use strict";
import {define, inject, path,Controller,IRequest,IResponse,pathGet} from '../../../../index';


@define()
export class QueryController extends Controller {

    @pathGet("/test/query")
    test(req, res) {
        res.json(req.query);
    }

    @path("/test/protocol")
    protocol(req: IRequest, res) {
        res.json({protocol: req.protocol, secure: req.secure, host: req.hostname});
    }

    @path("/test/cookie")
    cookie(req: IRequest, res: IResponse) {

        let date = new Date()
        date.setUTCFullYear(2100, 1, 1)
        date.setUTCHours(0, 0, 0, 0)
        res.cookie('cookie', 'hey', {expires: date});

        res.json((req as any).cookies);
    }

    @path("/test/cookie_json")
    cookieJson(req: IRequest, res: IResponse) {

        let date = new Date()
        date.setUTCFullYear(2100, 1, 1)
        date.setUTCHours(0, 0, 0, 0)
        res.cookie('cookie', {test: "working"}, {expires: date});

        res.json((req as any).cookies);
    }

    @path("/test/cookie_clear")
    cookieClear(req: IRequest, res: IResponse) {

        let date = new Date()
        date.setUTCFullYear(2100, 1, 1)
        date.setUTCHours(0, 0, 0, 0)
        res.clearCookie('cookie');

        this.sendOk();
    }

}
