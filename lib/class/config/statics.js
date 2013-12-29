"use strict";
module.exports = function (klass, statics) {
    for (var key in statics) {
        if (statics.hasOwnProperty(key)) {
            klass[key]  = statics[key];
        }
    }
};