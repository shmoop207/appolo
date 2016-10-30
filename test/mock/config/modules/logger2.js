var appolo = require('../../../../index'),
    Q = require('bluebird');



module.exports  = function (options) {
    return   (env, inject, logger)=> {

        var logger2 = {
            getName: function () {
                return env.test + "logger2" + logger.getName();
            }
        };

        inject.addObject('logger2', logger2);

        return Q.delay( 100)
    }
}





