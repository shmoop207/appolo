"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
class FilesLoader {
    *load(root, filesPath) {
        if (!_.isArray(filesPath)) {
            filesPath = [filesPath];
        }
        for (let filePath of filesPath) {
            yield* this._loadFiles(path.join(root, filePath));
        }
    }
    *_loadFiles(filePath) {
        if (fs.existsSync(filePath)) {
            for (let file of fs.readdirSync(filePath)) {
                let newPath = path.join(filePath, file);
                let stat = fs.statSync(newPath);
                if (stat.isFile() && /(.*)\.(js)$/.test(file) && !_.startsWith(file, "~")) {
                    yield newPath;
                }
                else if (stat.isDirectory() && !_.startsWith(file, "~")) {
                    yield* this._loadFiles(newPath);
                }
            }
        }
    }
}
exports.FilesLoader = FilesLoader;
exports.default = new FilesLoader();
//# sourceMappingURL=loader.js.map