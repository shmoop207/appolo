var Class = require('appolo-class');

module.exports = Class.define({

    on: function (event, fn) {

        if (!this._eventDispacherCallbacks) {
            this._eventDispacherCallbacks = {};
        }

        (this._eventDispacherCallbacks[event] = this._eventDispacherCallbacks[event] || []).push(fn);

        return this;
    },

    un: function (event, fn) {

        if (this._eventDispacherCallbacks) {

            var callbacks = this._eventDispacherCallbacks[event];

            if (callbacks && callbacks.length > 0) {
                var index = callbacks.indexOf(fn);
                if (index > -1) {
                    callbacks.splice(index, 1);
                }
            }
        }

        return this;
    },

    fireEvent :function (event){

        if (this._eventDispacherCallbacks) {
            var args = Array.prototype.slice.call(arguments, 1)
                , callbacks = this._eventDispacherCallbacks[event]
                , len;

            if (callbacks) {
                len = callbacks.length;
                for (var i = 0; i < len; ++i) {
                    callbacks[i].apply(this, args)
                }
            }
        }

        return this;
    }
});
