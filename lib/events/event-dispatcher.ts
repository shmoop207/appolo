"use strict";
import _ = require('lodash');
import {Util} from "../util/util";

export class EventDispatcher {

    _eventDispatcherCallbacks:{[index:string]:{fn:Function,scope:any}[]};

    public on(event:string, fn:Function,scope?:any):EventDispatcher {

        if (!this._eventDispatcherCallbacks) {
            this._eventDispatcherCallbacks = {};
        }

        let callbacks = this._eventDispatcherCallbacks[event];

        if(!callbacks){
            this._eventDispatcherCallbacks[event] = callbacks = [];
        }

        callbacks.push({
            fn:fn,
            scope:(scope || this)
        });

        return this;
    }

    public un(event:string, fn:Function,scope?:any):EventDispatcher {

        if (this._eventDispatcherCallbacks) {

            let callbacks = this._eventDispatcherCallbacks[event];

            if (callbacks && callbacks.length > 0) {

                _.remove(callbacks, (callback)=> {
                    return callback.fn === fn && callback.scope === (scope || this);
                });
            }
        }

        return this;
    }

    public fireEvent (event:string,...args: any[]):EventDispatcher{

        if (this._eventDispatcherCallbacks) {
            let callbacks = this._eventDispatcherCallbacks[event];

            if (callbacks) {
                callbacks = Util.cloneArr(callbacks); // to handle the case of un during the fire event

                _.forEach(callbacks,(callback)=>{
                    if(callback && callback.fn && callback.scope){
                        callback.fn.apply((callback.scope || this), args);
                    }
                })
            }
        }

        return this;
    }

    public removeAllListeners():EventDispatcher{
        _.forEach(this._eventDispatcherCallbacks,(callbacks)=>{
            callbacks.length = 0;
        });

        this._eventDispatcherCallbacks = {};

        return this
    }
}

