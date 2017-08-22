"use strict";

import fs = require('fs');
import    path = require('path');
import    _ = require('lodash');

export class FilesLoader {

    public * load(root:string, filesPath:string|string[]) {
        if (!_.isArray(filesPath)) {
            filesPath = [filesPath];
        }

        for (let filePath of filesPath) {

            yield * this._loadFiles(path.join(root, filePath));
        }
    }

    private * _loadFiles(filePath:string) {
        if (fs.existsSync(filePath)) {

            for (let file of fs.readdirSync(filePath)) {
                let newPath = path.join(filePath, file);
                let stat = fs.statSync(newPath);

                if (stat.isFile() && /(.*)\.(js)$/.test(file) && !_.startsWith(file, "~")) {
                    yield newPath;
                } else if (stat.isDirectory()  && !_.startsWith(file, "~")) {
                    yield * this._loadFiles(newPath);
                }
            }
        }
    }
}


export default  new FilesLoader();
