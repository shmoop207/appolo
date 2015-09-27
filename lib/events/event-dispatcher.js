"use strict";
var _ = require('lodash');

class EventDispatcher {

    on(event, fn,scope) {

        if (!this._eventDispatcherCallbacks) {
            this._eventDispatcherCallbacks = {};
        }

        var callbacks = this._eventDispatcherCallbacks[event];

        if(!callbacks){
            this._eventDispatcherCallbacks[event] = callbacks = [];
        }

        callbacks.push({
            fn:fn,
            scope:(scope || this)
        });

        return this;
    }

    un(event, fn,scope) {

        if (this._eventDispatcherCallbacks) {

            var callbacks = this._eventDispatcherCallbacks[event];

            if (callbacks && callbacks.length > 0) {

                _.remove(callbacks, function(callback) {
                    return callback.fn === fn && callback.scope === (scope || this);
                },this);
            }
        }

        return this;
    }

    fireEvent (event){

        if (this._eventDispatcherCallbacks) {
            var args = Array.prototype.slice.call(arguments, 1)
                , callbacks = this._eventDispatcherCallbacks[event];

            if (callbacks) {
                callbacks = _.clone(callbacks); // to handle the case of un during the fire event

                _.forEach(callbacks,function(callback){
                    if(callback && callback.fn && callback.scope){
                        callback.fn.apply((callback.scope || this), args);
                    }
                },this)
            }
        }

        return this;
    }

    removeAllListeners(){
        _.forEach(this._eventDispatcherCallbacks,function(callbacks){
            callbacks.length = 0;
        });

        this._eventDispatcherCallbacks = {};
    }
}


module.exports =  EventDispatcher;