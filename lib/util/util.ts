"use strict";

import _ = require('lodash');

export class Util {
    public static getFunctionArgs(func: (...args: any[]) => any) {

        const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        const ARGUMENT_NAMES = /([^\s,]+)/g;

        let fnStr = func.toString().replace(STRIP_COMMENTS, '');
        let args = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);

        if (args === null) {
            args = [];
        }

        _.remove(args, function (arg) {
            return (arg == "" || arg == undefined || arg == null)
        });

        return args;
    }

    public static  namespace(namespace: string, value: any) {
        let properties = namespace.split('.');

        let parent = global;

        while (properties.length) {
            let property = properties.shift();
            if (typeof parent[property] === 'undefined') {
                parent[property] = {};
            }

            if (properties.length == 0 && value) {
                parent[property] = value;
            }
            else {
                parent = parent[property];
            }
        }

        return parent;
    }

    public static mixins(_klass: Function,mixins:Function | Function[]) {

        _.forEach(_.isArray(mixins) ? mixins : [mixins], (mixin) => {
            _(Object.getOwnPropertyNames(mixin.prototype))
                .without("constructor")
                .forEach(name => _klass.prototype[name] = mixin.prototype[name])

        });

    }

    public static  statics(_klass:Function,key:{[index:string]:any}|string, value?:any) {


        let statics = {};

        if (value) {
            statics[key as string] = value
        } else {
            statics = key;
        }

        _.forEach(statics, (func, name) => {

            Object.defineProperty(_klass, name, {
                get: function () {
                    return func
                }
            });

            Object.defineProperty(_klass.prototype, name, {
                get: function () {
                    return func
                }
            });
        });

    }

    public static cloneArr<T>(a: T[]): T[] {
        let b = new Array(a.length);
        let i = a.length;
        while (i--) {
            b[i] = a[i];
        }

        return b;
    }


}

// _.mixin({
//     pickObjectParams: function (data, params) {
//
//         params = Array.prototype.slice.call(arguments, 1);
//
//         return _.map(data,  (item) =>{
//             return _.pick.apply(_, [item].concat(params));
//         });
//     },
//     omitObjectParams: function (datam, params) {
//
//         params = Array.prototype.slice.call(arguments, 1);
//
//         return _.map(data,  (item)=> {
//             return _.omit.apply(_, [item].concat(params));
//         });
//
//     },
//     stripHtml: function (str) {
//
//         return str.replace(/<(?:.|\n)*?>/gm, '');
//
//     },
//     timeAgoDate: function (time) {
//         var date = new Date(time),
//             diff = (((new Date()).getTime() - date.getTime()) / 1000),
//             day_diff = Math.floor(diff / 86400);
//
//         if (isNaN(day_diff) || day_diff < 0)
//             return;
//
//         return day_diff == 0 && (
//             diff < 60 && "just now" ||
//             diff < 120 && "1 minute ago" ||
//             diff < 3600 && Math.floor(diff / 60) + " minutes ago" ||
//             diff < 7200 && "1 hour ago" ||
//             diff < 86400 && Math.floor(diff / 3600) + " hours ago") ||
//             day_diff == 1 && "Yesterday" ||
//             day_diff < 7 && day_diff + " days ago" ||
//             day_diff < 31 && Math.ceil(day_diff / 7) + " weeks ago" ||
//             day_diff < 365 && Math.ceil(day_diff / 30) + " mounts ago" ||
//             day_diff > 365 && Math.floor(day_diff / 365) + " years ago";
//     },
//
//     getImageFromContent: function (str) {
//         var image = str.match(/<img.+?src=["'](.+?)["'].+?>/)
//
//         return image ? image[1] : "";
//     },
//     addhttp: function (url) {
//         if (!/^(f|ht)tps?:\/\//i.test(url)) {
//             url = "http://" + url;
//         }
//         return url;
//     },
//     truncate: function (str, length, truncateStr) {
//         if (str == null) return '';
//         str = String(str);
//         truncateStr = truncateStr || '...';
//         length = ~~length;
//         return str.length > length ? str.slice(0, length) + truncateStr : str;
//     },
//
//     getAllPropertyNames: function (obj) {
//         var props = [];
//
//         do {
//             if (obj.prototype) {
//                 props = props.concat(Object.getOwnPropertyNames(obj.prototype));
//             }
//
//         } while (obj = Object.getPrototypeOf(obj));
//
//         return props;
//     },
//
//     ,
//
//     namespace: function (namespace, value) {
//         var properties = namespace.split('.');
//
//         var parent = global;
//
//         while (properties.length) {
//             var property = properties.shift();
//             if (typeof parent[property] === 'undefined') {
//                 parent[property] = {};
//             }
//
//             if (properties.length == 0 && value) {
//                 parent[property] = value;
//             }
//             else {
//                 parent = parent[property];
//             }
//         }
//
//         return parent;
//     },
//
//     deepExtend: function (obj) { //https://gist.github.com/kurtmilam/1868955
//         var parentRE = /#{\s*?_\s*?}/,
//             slice = Array.prototype.slice,
//             hasOwnProperty = Object.prototype.hasOwnProperty;
//
//         _.each(slice.call(arguments, 1), function (source) {
//             for (var prop in source) {
//                 if (hasOwnProperty.call(source, prop)) {
//                     if (_.isUndefined(obj[prop]) || _.isFunction(obj[prop]) || _.isNull(source[prop]) || _.isDate(source[prop])) {
//                         obj[prop] = source[prop];
//                     }
//                     else if (_.isString(source[prop]) && parentRE.test(source[prop])) {
//                         if (_.isString(obj[prop])) {
//                             obj[prop] = source[prop].replace(parentRE, obj[prop]);
//                         }
//                     }
//                     else if (_.isArray(obj[prop]) || _.isArray(source[prop])) {
//                         if (!_.isArray(obj[prop]) || !_.isArray(source[prop])) {
//                             throw 'Error: Trying to combine an array with a non-array (' + prop + ')';
//                         } else {
//                             obj[prop] = _.reject(_.deepExtend(obj[prop], source[prop]), function (item) {
//                                 return _.isNull(item);
//                             });
//                         }
//                     }
//                     else if (_.isObject(obj[prop]) || _.isObject(source[prop])) {
//                         if (!_.isObject(obj[prop]) || !_.isObject(source[prop])) {
//                             throw 'Error: Trying to combine an object with a non-object (' + prop + ')';
//                         } else {
//                             obj[prop] = _.deepExtend(obj[prop], source[prop]);
//                         }
//                     } else {
//                         obj[prop] = source[prop];
//                     }
//                 }
//             }
//         });
//         return obj;
//     }
//
//
// });
//
// if (!String.prototype.format) {
//     String.prototype.format = function () {
//         var args = arguments;
//         return this.replace(/{(\d+)}/g, function (match, number) {
//             return typeof args[number] != 'undefined'
//                 ? args[number]
//                 : match
//                 ;
//         });
//     };
// }
