"use strict";
// import {Cache} from "appolo-lru-cache";
// import fs = require("fs");
// import path = require("path");
// import Q = require("bluebird");
// import {IOptions} from "../interfaces/IOptions";
// import {HttpError} from "../common/error/httpError";
//
// export class View {
//
//     private _cache: Cache<string, { path: string }>;
//     private _options: IOptions;
//
//     public initialize(_options: IOptions) {
//         this._options = _options;
//         this._cache = new Cache({maxSize: this._options.maxRouteCache});
//     }
//
//     public async render(controllerName: string, actionName: string, name: string, params: any): Promise<string> {
//
//         try {
//
//             name = name || actionName;
//             params = params || {};
//
//             let key = `${controllerName}${actionName}${name}`;
//
//             let item = this._cache.peek(key);
//
//             if (!item) {
//                 let ext = path.extname(name);
//
//                 if (!ext) {
//                     name += `.${this._options.viewExt || "html"}`;
//                 }
//
//                 let paths = [
//                     path.resolve(this._options.root, name),
//                     path.resolve(this._options.root, this._options.viewFolder, controllerName, name),
//                     path.resolve(this._options.root, this._options.viewFolder, name),
//                     path.resolve(this._options.root, "server/controllers", controllerName, name),
//                     path.resolve(this._options.root, "server/controllers", name)
//                 ];
//
//                 let foundPath = await this._lookup(paths.slice());
//
//                 if (!foundPath) {
//                     throw new HttpError(500, `failed to find view path for ${name} ${controllerName} ${actionName} searched paths ${JSON.stringify(paths)}`)
//                 }
//
//                 if (!this._options.viewEngine) {
//                     throw new HttpError(500, `tried to call render but view engine is no defined`)
//                 }
//
//                 item = {path: foundPath};
//
//                 this._cache.set(key, item);
//             }
//
//             let result = await this._options.viewEngine(item.path, {cache: true, ...params});
//
//             return result;
//
//
//         } catch (e) {
//             throw new HttpError(500, `failed to render view ${e.toString()}`)
//         }
//
//     }
//
//     private async _lookup(paths: string[]): Promise<string> {
//
//         let path = paths.shift();
//
//         if (!path) {
//             return null;
//         }
//
//         let isExist = await this._isFileExist(path);
//
//         if (isExist) {
//             return path;
//         }
//
//         return this._lookup(paths);
//
//     }
//
//     private async _isFileExist(path: string): Promise<boolean> {
//
//         try {
//             let result: fs.Stats = await Q.fromCallback(c => fs.stat(path, c));
//             return result.isFile();
//         } catch (e) {
//             return false;
//         }
//     }
// }
//
// export default new View();
//# sourceMappingURL=view.js.map