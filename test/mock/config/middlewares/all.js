"use strict";
const bodyParser = require("body-parser");
const serve = require("serve-static");
const path = require("path");
const cookieParser = require("cookie-parser");
const consolidate = require("consolidate");
module.exports = function (app, env) {
    app.enableContext();
    app.use(bodyParser.urlencoded({
        extended: true,
        parameterLimit: 10000,
        limit: 1024 * 1024 * 10
    }));
    app.use(bodyParser.json({
        //parameterLimit: 10000,
        limit: 1024 * 1024 * 10
    }));
    app.viewEngine(consolidate.nunjucks);
    app.use(cookieParser());
    app.use(serve(path.join(__dirname, "../../uploads")));
    app.use(function (req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin || '*');
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Cache-Control", "max-age=0, no-cache, must-revalidate, proxy-revalidate");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.setHeader("P3P", 'CP="CURa ADMa DEVa PSAo PSDo OUR BUS UNI PUR INT DEM STA PRE COM NAV OTC NOI DSP COR"');
        res.setHeader("Access-Control-Allow-Methods", "GET, PUT, PATCH, DELETE, HEAD, OPTIONS");
        res.setHeader("Allow", "GET, PUT, PATCH, DELETE, HEAD, OPTIONS");
        //
        // intercept OPTIONS method
        if (req.method == 'OPTIONS') {
            res.setHeader('Content-Length', '0');
            res.statusCode = 204;
            res.end();
        }
        else {
            next();
        }
    });
};
//# sourceMappingURL=all.js.map