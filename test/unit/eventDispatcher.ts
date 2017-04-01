"use strict";
import appolo  = require('../../index');
import chai = require('chai')
import {EventDispatcher} from "../../lib/events/event-dispatcher";

let should = chai.should();

describe("event dispatcher", function () {

    class EventHandler{

        dispatcher:appolo.EventDispatcher;

        constructor (dispatcher){
            this.dispatcher = dispatcher;
        }

        handle (){
            this.dispatcher.un('topic', this.handle, this)
        }
    }

    it('can un-subscribe from event while handling the event itself', function () {
        let dispatcher = new appolo.EventDispatcher();

        let handler1 = new EventHandler(dispatcher);
        let handler2 = new EventHandler(dispatcher);

        dispatcher.on('topic', handler1.handle, handler1);
        dispatcher.on('topic', handler2.handle, handler2);

        (function(){dispatcher.fireEvent('topic')}).should.not.throw();

        // dispatcher.fireEvent('topic').should.not.throw();
    });
});