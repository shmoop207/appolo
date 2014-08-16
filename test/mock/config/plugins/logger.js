var plugin = require('../../../../lib/plugin/plugin');


plugin.addPlugin(function (env) {
    return {
        logger: {
            getName:function(){
                return env.test;
            }
        }
    }
})