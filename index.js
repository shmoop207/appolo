var launcher = require('./lib/launcher/launcher'),
    moduleManager = require('./lib/modules/modules'),
    define = require('./lib/define/define');

module.exports = {
    Util : require('./lib/util/util'),
    EventDispatcher : require('./lib/events/event-dispatcher'),
    Launcher : launcher.Launcher,
    inject : require('./lib/inject/inject'),
    define : define.define,
    Linq : require('./lib/define/linq'),
    definePlugin : define.definePlugin,
    loader : require('./lib/loader/loader'),
    launcher : launcher.launcher,
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



