"use strict";
var should = require('chai').should();
var appolo  = require('../../index');


describe("event dispatcher", function () {

    class EventHandler{
        constructor (dispatcher){
            this.dispatcher = dispatcher;
        }

        handle (){
            this.dispatcher.un('topic', this.handle, this)
        }
    }

    it('can un-subscribe from event while handling the event itself', function () {
        var dispatcher = new appolo.EventDispatcher();

        var handler1 = new EventHandler(dispatcher);
        var handler2 = new EventHandler(dispatcher);

        dispatcher.on('topic', handler1.handle, handler1);
        dispatcher.on('topic', handler2.handle, handler2);

        (function(){dispatcher.fireEvent('topic')}).should.not.throw();

        // dispatcher.fireEvent('topic').should.not.throw();
    });
});