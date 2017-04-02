"use strict";
import appolo  = require('../../index');
import chai = require('chai')
import {EventDispatcher} from "../../lib/events/event-dispatcher";
import Q = require("bluebird");

let should = chai.should();

describe("event dispatcher", function () {

    class EventHandler {

        dispatcher: appolo.EventDispatcher;

        constructor(dispatcher) {
            this.dispatcher = dispatcher;
        }

        handle() {
            this.dispatcher.un('topic', this.handle, this)
        }
    }

    it('can un-subscribe from event while handling the event itself', function () {
        let dispatcher = new appolo.EventDispatcher();

        let handler1 = new EventHandler(dispatcher);
        let handler2 = new EventHandler(dispatcher);

        dispatcher.on('topic', handler1.handle, handler1);
        dispatcher.on('topic', handler2.handle, handler2);

        (function () {
            dispatcher.fireEvent('topic')
        }).should.not.throw();

        // dispatcher.fireEvent('topic').should.not.throw();
    });

    it("should fire event with params", async () => {
        let value = 0;
        class EventHandler extends EventDispatcher {
            constructor() {
                super();
                setTimeout(() => this.fireEvent("test", 5), 100)
            }
        }

        let a = new EventHandler();
        a.on("test", (v) => value = v);

        await Q.delay(150);

        value.should.be.eq(5);


    })

    it("should subscribe with fire event with params", async () => {
        let value = 0;
        class EventHandler extends EventDispatcher {
            constructor() {
                super();
                setTimeout(() => this.fireEvent("test", 5), 100)
            }
        }

        let a = new EventHandler();

        let fn = (v) => value = v;
        a.on("test", fn);
        await Q.delay(10);
        a.un("test", fn);
        await Q.delay(140);

        value.should.be.eq(0);


    })

    it("should removeAllListeners with fire event with params", async () => {
        let value = 0;
        class EventHandler extends EventDispatcher {
            constructor() {
                super();
                setTimeout(() => this.fireEvent("test", 5), 100)
            }
        }

        let a = new EventHandler();

        let fn = ((v) => value = v);
        a.on("test", fn);
        await Q.delay(10);
        a.removeAllListeners();
        await Q.delay(140);

        value.should.be.eq(0);


    })
});