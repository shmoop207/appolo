"use strict";
module.exports = function (klass, namespace) {

    if (namespace) {
        var parts = namespace.split('.'),
            parent = global,
            currentPart = '';

        for (var i = 0, length = parts.length - 1; i < length; i++) {
            currentPart = parts[i];
            parent[currentPart] = parent[currentPart] || {};
            parent = parent[currentPart];
        }

        parent[parts[i]]  = klass;
    }


};