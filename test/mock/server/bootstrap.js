var EventDispatcher = require('../../../lib/events/event-dispatcher');

module.exports = EventDispatcher.define({
    $config:{
        id:'appolo-bootstrap',
        singleton:true,
        inject:['manager']
    },


    run:function(callback){


        this.working = true;

        callback();
    }
})