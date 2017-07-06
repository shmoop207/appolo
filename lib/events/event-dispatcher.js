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
                for (let i = callbacks.length - 1; i >= 0; i--) {
                    let callback = callbacks[i];
                    if (callback.fn === fn && callback.scope === (scope || this)) {
                        callbacks.splice(i, 1);
                    }
                }
            }
        }
        return this;
    }
    fireEvent(event, ...args) {
        if (this._eventDispatcherCallbacks) {
            let callbacks = this._eventDispatcherCallbacks[event];
            if (callbacks) {
                callbacks = util_1.Util.cloneArr(callbacks); // to handle the case of un during the fire event
                if (callbacks) {
                    for (let i = callbacks.length - 1; i >= 0; i--) {
                        let callback = callbacks[i];
                        if (callback && callback.fn && callback.scope) {
                            callback.fn.apply((callback.scope || this), args);
                        }
                    }
                }
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