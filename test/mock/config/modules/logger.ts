import appolo = require('../../../../index');
import {Injector} from '@appolo/inject';


export  function logger(env,inject:Injector,callback) {

    let logger =  {
        getName:function(){
            return env.test;
        }
    }

    inject.addObject('logger',logger);

    callback();

}
