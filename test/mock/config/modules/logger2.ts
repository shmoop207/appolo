import appolo = require('../../../../index');
import {Promises} from '@appolo/utils';

import {Injector} from '@appolo/inject';
import {IEnv} from "../env/IEnv";


export function logger2(options?) {
    return  async function (env:IEnv, inject:Injector, logger) {

        let logger2 = {
            getName: function () {
                return env.test + "logger2";
            }
        }

        inject.addObject('logger2', logger2);

       return Promises.delay(100);
    }
}



