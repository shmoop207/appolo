"use strict";
module.exports = function (app) {
    function one(req, res, next) {
        req.one = true;
        next();
    }
    function two(req, res, next) {
        req.two = true;
        next();
    }
    app.use(one);
    app.use(two);
};
//# sourceMappingURL=all.js.map