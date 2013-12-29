"use strict";
module.exports = function (prototype, mixins) {
    var i, length, mixin, key,
        ignoredKeys = { constructor: true, $parent: true, prototype: true, $super: true, callParent: true, main: true, toString: true };

    for (i = 0, length = (mixins || []).length; i < length; i++) {

        mixin = mixins[i];

        for (key in mixin.prototype) {
            if (mixin.prototype.hasOwnProperty(key) && !ignoredKeys[key]) {
                prototype[key] = mixin.prototype[key];
            }
        }
    }
};
