import appolo = require('../../../../index');
import    Q = require('bluebird');


export default function (options?: any) {

    return async (env, inject: appolo.Injector,logger6): Promise<any> => {

        let logger7 = {
            getName: function () {
                return env.test + logger6.getName()+ "logger7";
            }
        };

        inject.addObject('logger7', logger7);

        await Q.delay(2)
    }
}





