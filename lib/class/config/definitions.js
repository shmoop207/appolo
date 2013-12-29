"use strict";
var Definitions = (function () {
    var DefinitionsClass = function () {
        this.config = {};
    };

    DefinitionsClass.prototype.extend = function (value) {
        this.config.extend = value;
    };

    DefinitionsClass.prototype.properties = function (value) {
        this.config.properties = value;
    };

    DefinitionsClass.prototype.mixins = function (value) {
        this.config.mixins = value;
    };

    DefinitionsClass.prototype.statics = function (value) {
        this.config.statics = value;
    };

    DefinitionsClass.prototype.namespace = function (value) {
        this.config.namespace = value;
    };

    DefinitionsClass.prototype.singleton = function (value) {
        this.config.singleton = value;
    };

    DefinitionsClass.prototype.initMethod = function (value) {
        this.config.initMethod = value;
    };

    DefinitionsClass.prototype.id = function (value) {
        this.config.id = value;
    };

    DefinitionsClass.prototype.set = function (value) {


        this.config = value;
    };

    return DefinitionsClass;

})();

module.exports = Definitions;
