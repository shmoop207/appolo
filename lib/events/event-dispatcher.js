var Class  = require('../class/class');

var EventDispatcher = Class.define(function () {

    this.constructor = function(){
        this.callbacks = {};
    }
});

EventDispatcher.prototype.on = function(event, fn){
    (this.callbacks[event] = this.callbacks[event] || [])
        .push(fn);
    return this;
};

EventDispatcher.prototype.un = function(event, fn){
    var callbacks = this.callbacks[event];

    if(callbacks && callbacks.length >0){
        var index = callbacks.indexOf(fn);
        if (index > -1) {
            callbacks.splice(index, 1);
        }
    }

    return this;
};


EventDispatcher.prototype.fireEvent = function(event){
    var args = Array.prototype.slice.call(arguments, 1)
        , callbacks = this.callbacks[event]
        , len;

    if (callbacks) {
        len = callbacks.length;
        for (var i = 0; i < len; ++i) {
            callbacks[i].apply(this, args)
        }
    }

    return this;
};

module.exports = EventDispatcher;
