"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo = require("../../index");
const chai = require("chai");
const event_dispatcher_1 = require("../../lib/events/event-dispatcher");
const Q = require("bluebird");
let should = chai.should();
describe("event dispatcher", function () {
    class EventHandler {
        constructor(dispatcher) {
            this.dispatcher = dispatcher;
        }
        handle() {
            this.dispatcher.un('topic', this.handle, this);
        }
    }
    it('can un-subscribe from event while handling the event itself', function () {
        let dispatcher = new appolo.EventDispatcher();
        let handler1 = new EventHandler(dispatcher);
        let handler2 = new EventHandler(dispatcher);
        dispatcher.on('topic', handler1.handle, handler1);
        dispatcher.on('topic', handler2.handle, handler2);
        (function () {
            dispatcher.fireEvent('topic');
        }).should.not.throw();
        // dispatcher.fireEvent('topic').should.not.throw();
    });
    it("should fire event with params", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        let value = 0;
        class EventHandler extends event_dispatcher_1.EventDispatcher {
            constructor() {
                super();
                setTimeout(() => this.fireEvent("test", 5), 100);
            }
        }
        let a = new EventHandler();
        a.on("test", (v) => value = v);
        yield Q.delay(150);
        value.should.be.eq(5);
    }));
    it("should subscribe with fire event with params", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        let value = 0;
        class EventHandler extends event_dispatcher_1.EventDispatcher {
            constructor() {
                super();
                setTimeout(() => this.fireEvent("test", 5), 100);
            }
        }
        let a = new EventHandler();
        let fn = (v) => value = v;
        a.on("test", fn);
        yield Q.delay(10);
        a.un("test", fn);
        yield Q.delay(140);
        value.should.be.eq(0);
    }));
    it("should removeAllListeners with fire event with params", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        let value = 0;
        class EventHandler extends event_dispatcher_1.EventDispatcher {
            constructor() {
                super();
                setTimeout(() => this.fireEvent("test", 5), 100);
            }
        }
        let a = new EventHandler();
        let fn = ((v) => value = v);
        a.on("test", fn);
        yield Q.delay(10);
        a.removeAllListeners();
        yield Q.delay(140);
        value.should.be.eq(0);
    }));
});
//# sourceMappingURL=eventDispatcher.js.map