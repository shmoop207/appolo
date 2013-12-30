"use strict";
var spring = require('../../spring/spring');

module.exports = function (klass, definitions) {

    var def = {},
        id = definitions.id || definitions.namespace;

    if (id) {

        if (definitions.inject && definitions.inject.length > 0) {

            definitions.properties = definitions.properties || [];

            for (var i = 0, length = definitions.inject.length; i < length; i++) {
                definitions.properties.push({
                    name:definitions.inject[i],
                    ref:definitions.inject[i]
                });
            }
        }

        def[id] = {
            singleton:definitions.singleton,
            initMethod:definitions.initMethod,
            props:definitions.properties,
            lookUpMethod:definitions.lookUpMethod,
            type:klass,
            path:definitions.path,
            args:definitions.args
        };

        spring.addDefinitions(def);
    }


};