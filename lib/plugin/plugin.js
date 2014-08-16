var inject = require('appolo-inject'),
    Class = require('appolo-class');


var plugins = [];

module.exports.plugins = plugins;

module.exports.addPlugin = function (func) {
    plugins.push(func);
};