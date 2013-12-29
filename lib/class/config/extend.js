"use strict";
module.exports = function (prototype, parent) {

    if (!Object.hasOwnProperty.call(prototype, "constructor")) {
        prototype.constructor = function () {
            parent.constructor.apply(this, Array.prototype.slice.call(arguments, 0));
        };
    }

    //create call parent method
    prototype.callParent = function (methodName) {
        return parent[methodName].apply(this, Array.prototype.slice.call(arguments, 1));
    };
};
