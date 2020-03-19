import appolo = require('../../../../index');
import {Promises} from 'appolo-utils';



export function logger2(options?) {
    return  async function (env:appolo.IEnv, inject:appolo.Injector, logger) {

        let logger2 = {
            getName: function () {
                return env.test + "logger2";
            }
        }

        inject.addObject('logger2', logger2);

       return Promises.delay(100);
    }
}



