import appolo = require('../../../../index');
import    Q = require('bluebird');


export default function (env,inject) {

    let logger =  {
        getName:function(){
            return env.test;
        }
    }

    inject.addObject('logger',logger);

    return Q.delay( 100)

}