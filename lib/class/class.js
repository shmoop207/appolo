"use strict";
var Class = function () {},
    Definitions = require('./config/definitions'),
    handleExtend = require('./config/extend'),
    handleStatics = require('./config/statics'),
    handleMixins = require('./config/mixins'),
    handleNamespace = require('./config/namespace'),
    handleSpring = require('./config/spring');


Class.define = function (parent, api) {

    var klass,
        prototype,
        definitions;


    //check if we have config
    if (!api) {
        api = parent;
        parent = this.prototype;
    }

    definitions = new Definitions();

    prototype  = Object.create(parent);

    api.apply(prototype, [definitions, parent]);

    handleExtend(prototype, parent);

    handleStatics(prototype.constructor, definitions.config.statics);

    handleMixins(prototype, definitions.config.mixins);

    handleNamespace(prototype.constructor, definitions.config.namespace);

    handleSpring(prototype.constructor, definitions.config);

    klass = prototype.constructor;

    klass.prototype = prototype;
    klass.define = Class.define;
    klass.definitions = definitions.config;



    return klass;
};

module.exports = Class;
