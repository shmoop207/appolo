"use strict";
module.exports = function (newClass, prototype, properties) {

    var createProperty = function (name, value, prototype) {

        var capitalizedName =  name.charAt(0).toUpperCase() + name.slice(1);

        prototype[name] = value;
        prototype['get' + capitalizedName]  =  function () {return this[name]; };
        prototype['set' + capitalizedName]  =  function (value) {this[name] = value; };
    };

    //define getters and setters for properties
    for (var key in properties) {
        if (properties.hasOwnProperty(key)) {
            createProperty(key, properties[key], prototype);
        }
    }
};
