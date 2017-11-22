import appolo = require('../../../../index');
import    Q = require('bluebird');


export default function (options?: any) {

    return async (env, inject: appolo.Injector): Promise<any> => {

        let logger6 = {
            getName: function () {
                return env.test + "logger6";
            }
        };

        inject.addObject('logger6', logger6);

        await Q.delay(2)
    }
}





