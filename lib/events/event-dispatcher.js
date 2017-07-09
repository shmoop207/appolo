"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
                for (let i = callbacks.length - 1; i >= 0; i--) {
                    let callback = callbacks[i];
                    if (callback && callback.fn && callback.scope) {
                        callback.fn.apply((callback.scope || this), args);
                    }
                }
            }
        }
        return this;
    }
    removeAllListeners() {
        let keys = Object.keys(this._eventDispatcherCallbacks || {});
        for (let i = 0, length = keys.length; i < length; i++) {
            let callbacks = this._eventDispatcherCallbacks[keys[i]];
            callbacks.length = 0;
        }
        this._eventDispatcherCallbacks = {};
        return this;
    }
}
exports.EventDispatcher = EventDispatcher;
//# sourceMappingURL=event-dispatcher.js.map