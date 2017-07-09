"use strict";
import _ = require('lodash');

export class EventDispatcher {

    protected _eventDispatcherCallbacks: { [index: string]: { fn: (...args: any[]) => any, scope?: any }[] };

    public on(event: string, fn: (...args: any[]) => any, scope?: any): EventDispatcher {

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

    public un(event: string, fn: (...args: any[]) => any, scope?: any): EventDispatcher {

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

    public fireEvent(event: string, ...args: any[]): EventDispatcher {

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

    public removeAllListeners(): EventDispatcher {

        let keys = Object.keys(this._eventDispatcherCallbacks || {});
        for (let i = 0, length = keys.length; i < length; i++) {
            let callbacks = this._eventDispatcherCallbacks[keys[i]];
            callbacks.length = 0;
        }

        this._eventDispatcherCallbacks = {};

        return this
    }
}

