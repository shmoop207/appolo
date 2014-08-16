module.exports = {
    Class : require('appolo-class'),
    Util : require('./lib/util/util'),
    EventDispatcher : require('./lib/events/event-dispatcher'),
    inject : require('./lib/inject/inject'),
    loader : require('./lib/loader/loader'),
    launcher : require('./lib/launcher/launcher'),
    environment : require('./lib/environments/environments'),
    addPlugin : require('./lib/plugin/plugin').addPlugin,
    _ : require('lodash')
}



