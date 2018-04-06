import appolo = require('../../../index');
import Q = require('bluebird');


export function logger3(options?) {
    return async function (env: appolo.IEnv, inject: appolo.Injector) {

        let logger3 = {
            getName: function () {
                return env.test + "logger3";
            }
        }

        inject.addObject('logger3', logger3);

        return Q.delay(1);
    }
}



