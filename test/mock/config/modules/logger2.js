var appolo = require('../../../../index');



module.exports  = function (options) {
    return  function (env, inject, logger, callback) {

        var logger = {
            getName: function () {
                return env.test + "logger2";
            }
        }

        inject.addObject('logger2', logger);

        setTimeout(function () {
            callback();
            callback();

        }, 100)
    }
}





