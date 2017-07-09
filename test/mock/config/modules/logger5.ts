
import appolo = require('../../../../index');
import    Q = require('bluebird');


export  default function (options?:any) {
    return   (env, inject:appolo.Injector, logger3,logger4)=> {

        let logger5 = {
            getName: function () {
                return logger4.getName()+"logger5";
            }
        };

        inject.addObject('logger5', logger5);

        return Q.delay(1)
    }
}





