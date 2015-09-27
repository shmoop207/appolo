"use strict";

var fs = require('fs'),
    path = require('path'),
    _ = require('lodash');

class FilesLoader {

     * load (root, filesPath, callback){
        if (!_.isArray(filesPath)) {
            filesPath = [filesPath];
        }

        for (let filePath of filesPath){

           yield * this._loadFiles(path.join(root, filePath));
        }
    }

    * _loadFiles (filePath){
        if (fs.existsSync(filePath)) {

            for ( let file of fs.readdirSync(filePath)){
                var newPath = path.join(filePath, file);
                var stat = fs.statSync(newPath);
                if (stat.isFile() && /(.*)\.(js)$/.test(file)) {
                   yield newPath;
                } else if (stat.isDirectory()) {
                    yield * this._loadFiles(newPath);
                }
            }
        }
    }
}




module.exports = new FilesLoader();
