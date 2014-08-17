"use strict";

var Class = require('appolo-class'),
    fs = require('fs'),
    path = require('path'),
    _ = require('lodash');


var FilesLoader = Class.define({

    load:function(root, filesPath, callback){
        if (!_.isArray(filesPath)) {
            filesPath = [filesPath];
        }

        _.forEach(filesPath, function (filePath) {
            this._loadFiles(path.join(root, filePath), callback);
        },this)
    },

    _loadFiles:function(filePath, callback){
        if (fs.existsSync(filePath)) {

            fs.readdirSync(filePath).forEach(function (file) {
                var newPath = path.join(filePath, file);
                var stat = fs.statSync(newPath);
                if (stat.isFile() && /(.*)\.(js)$/.test(file)) {
                    callback(newPath);
                } else if (stat.isDirectory()) {
                    this._loadFiles(newPath, callback);
                }
            }.bind(this));
        }
    }
});




module.exports = new FilesLoader();
