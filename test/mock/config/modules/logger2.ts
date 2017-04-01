import appolo = require('../../../../index');
import    Q = require('bluebird');

export interface Logger2{
    getName():string
}

export  default function (options?:any) {
    return   (env, inject:appolo.Injector, logger,next)=> {

        let logger2 = {
            getName: function () {
                return env.test + "logger2" + logger.getName();
            }
        };

        inject.addObject('logger2', logger2);

        next()
    }
}





