"use strict";

var fs = require('fs'),
    path = require('path');

module.exports.loadFiles = function loadFiles(paths,root) {

    if(!paths){
        return;
    }

    for (var i = 0, length = paths.length; i < length; i++) {

        var location = paths[i],

            files = fs.readdirSync(path.join(root, location)),
            filePath,
            file;

        for (var j = 0, lengthFiles = files.length; j < lengthFiles; j++) {

            file = files[j];
            filePath = location + '/' + file;

            if (fs.statSync(filePath).isDirectory()) {

                if (file.match(/^\.(git|svn)$/)) {
                    return;
                }

                loadFiles([filePath],root);

            } else {
                if (file.match(/\.js$/)) {
                    require(path.join(root, filePath));

                }
            }
        }
    }
};