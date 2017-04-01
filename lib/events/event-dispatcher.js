"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const util_1 = require("../util/util");
class EventDispatcher {
    on(event, fn, scope) {
        if (!this._eventDispatcherCallbacks) {
            this._eventDispatcherCallbacks = {};
        }
        let callbacks = this._eventDispatcherCallbacks[event];
        if (!callbacks) {
            this._eventDispatcherCallbacks[event] = callbacks = [];
        }
        callbacks.push({
            fn: fn,
            scope: (scope || this)
        });
        return this;
    }
    un(event, fn, scope) {
        if (this._eventDispatcherCallbacks) {
            let callbacks = this._eventDispatcherCallbacks[event];
            if (callbacks && callbacks.length > 0) {
                _.remove(callbacks, (callback) => {
                    return callback.fn === fn && callback.scope === (scope || this);
                });
            }
        }
        return this;
    }
    fireEvent(event) {
        if (this._eventDispatcherCallbacks) {
            let args = Array.prototype.slice.call(arguments, 1), callbacks = this._eventDispatcherCallbacks[event];
            if (callbacks) {
                callbacks = util_1.Util.cloneArr(callbacks); // to handle the case of un during the fire event
                _.forEach(callbacks, (callback) => {
                    if (callback && callback.fn && callback.scope) {
                        callback.fn.apply((callback.scope || this), args);
                    }
                });
            }
        }
        return this;
    }
    removeAllListeners() {
        _.forEach(this._eventDispatcherCallbacks, (callbacks) => {
            callbacks.length = 0;
        });
        this._eventDispatcherCallbacks = {};
        return this;
    }
}
exports.EventDispatcher = EventDispatcher;
//# sourceMappingURL=event-dispatcher.js.map