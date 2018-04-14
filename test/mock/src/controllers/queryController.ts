"use strict";
import {controller, inject, get,Controller,IRequest,IResponse} from '../../../../index';


@controller()
export class QueryController extends Controller {

    @get("/test/query")
    test(req, res) {
        res.json(req.query);
    }

    @get("/test/protocol")
    protocol(req: IRequest, res) {
        res.json({protocol: req.protocol, secure: req.secure, host: req.hostname});
    }

    @get("/test/cookie")
    cookie(req: IRequest, res: IResponse) {

        let date = new Date()
        date.setUTCFullYear(2100, 1, 1)
        date.setUTCHours(0, 0, 0, 0)
        res.cookie('cookie', 'hey', {expires: date});

        res.json((req as any).cookies);
    }

    @get("/test/cookie_json")
    cookieJson(req: IRequest, res: IResponse) {

        let date = new Date()
        date.setUTCFullYear(2100, 1, 1)
        date.setUTCHours(0, 0, 0, 0)
        res.cookie('cookie', {test: "working"}, {expires: date});

        res.json((req as any).cookies);
    }

    @get("/test/cookie_clear")
    cookieClear(req: IRequest, res: IResponse) {

        let date = new Date()
        date.setUTCFullYear(2100, 1, 1)
        date.setUTCHours(0, 0, 0, 0)
        res.clearCookie('cookie');

        this.sendOk();
    }

}
