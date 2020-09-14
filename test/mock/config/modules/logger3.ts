import appolo = require('../../../../index');
import {Promises} from '@appolo/utils';

import {Injector} from '@appolo/inject';
import {IEnv} from "../env/IEnv";

export function logger3(options?) {
    return async function (env: IEnv, inject: Injector) {

        let logger3 = {
            getName: function () {
                return env.test + "logger3";
            }
        };

        inject.addObject('logger3', logger3);

        return Promises.delay(1);
    }
}



