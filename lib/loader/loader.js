"use strict";

var fs = require('fs'),
    path = require('path');

var Loader = function () {

    var _self = this,
        options = {};

    var loadFiles = function (paths) {

        for (var i = 0, length = paths.length; i < length; i++) {

            var location = paths[i],

                files = fs.readdirSync(path.join(options.root, location)),
                filePath,
                file;

            for (var j = 0, lengthFiles = files.length; j < lengthFiles; j++) {

                file = files[j];
                filePath = location + '/' + file;

                if (fs.statSync(filePath).isDirectory()) {

                    if (file.match(/^\.(git|svn)$/)) {
                        return;
                    }

                    loadFiles([filePath]);

                } else {
                    if (file.match(/\.js$/)) {
                        require(path.join(options.root, filePath));


                    }
                }
            }
        }
    };

    this.loadFiles = function (opts) {
        options = opts;

        loadFiles(options.paths);
    };

};

module.exports = new Loader();