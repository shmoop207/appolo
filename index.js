var launcher = require('./lib/launcher/launcher'),
    moduleManager = require('./lib/modules/modules');

module.exports = {
    Class : require('appolo-class'),
    Util : require('./lib/util/util'),
    EventDispatcher : require('./lib/events/event-dispatcher'),
    inject : require('./lib/inject/inject'),
    loader : require('./lib/loader/loader'),
    launcher : launcher = require('./lib/launcher/launcher'),
    environment : require('./lib/environments/environments'),
    module : require('./lib/modules/modules'),
    _ : require('lodash'),

    use:function(func){
        moduleManager.register(func);
    },
    launch:function(config,callback){
        launcher.launch(config,callback);
    }
}



