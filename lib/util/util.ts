import appolo = require('appolo-engine');


export class Util extends appolo.Util {


    private static readonly UrlRegex: RegExp = /^(\/\/?(?!\/)[^?#\s]*)(\?[^#\s]*)?$/

    public static convertSnakeCaseToCamelCase(str: string) {
        return str.replace(/(\_\w)/g, function (m) {
            return m[1].toUpperCase();
        });
    }

    public static convertModelToCamelCase(model: any): any {

        let keys = Object.keys(model);

        let output = {};

        for (let i = 0, len = keys.length; i < len; i++) {
            let key = keys[i];
            output[Util.convertSnakeCaseToCamelCase(key)] = model[key]
        }
        return output
    }

    public static getAllPropertyNames(obj) {
        var props = [];

        do {
            if (obj.prototype) {
                props = props.concat(Object.getOwnPropertyNames(obj.prototype));
            }

        } while (obj = Object.getPrototypeOf(obj));

        return props;
    }

    public static isClass(v: any): boolean {
        return typeof v === 'function' && v.name && /^\s*class\s+/.test(v.toString());
    }


    public static decodeParam(val: string): string {
        if (typeof val !== 'string' || val.length === 0) {
            return val;
        }

        try {
            return decodeURIComponent(val);
        } catch (err) {
            if (err instanceof URIError) {
                err.message = `Failed to decode param ${val}`

                throw err;
            }

        }
    }

    public static mixinProperties(obj: any, proto: any, keys?: string[]): any {
        keys = keys || Object.keys(proto);

        for (let i = 0, l = keys.length; i < l; i++) {
            let prop = keys[i];
            obj[prop] = proto[prop];

        }

        return obj;
    }

    public static addSlashEnd = (str: string): string => {
        if (str[str.length - 1] != "/") {
            return str += "/"
        }

        return str;
    };

    public static addSlashEndFast = (str: string): string => {

        if (str.charCodeAt(str.length - 1) != 47) {
            return str += "/"
        }

        return str;
    };

    // public static parseUrl(str: string): { pathName: string, query: string } {
    //     let match = this.UrlRegex.exec(str);
    //     if (match) {
    //         let pathName = match[1];
    //         let query = match[2] || "";
    //         if (query) {
    //             query = query.substring(1)
    //         }
    //         return {pathName, query}
    //     }
    //     let parsed = url.parse(str);
    //     return {
    //         pathName: parsed.pathname,
    //         query: parsed.query
    //     }
    //
    // }

    public static parseUrlFast(str: string): { pathname: string, query: string } {
        let index = str.indexOf('?');
        if (index > -1) {
            let pathname = str.substring(0, index);
            let query = str.substring(index + 1);

            return {query, pathname}
        } else {
            return {pathname: str, query: ""}
        }
    }

    public static parseQsFast(url: string): any {


        let vars: { [index: string]: any } = {}, hash: any[];
        let hashes = (url || "").split('&');

        for (let i = 0, length = hashes.length; i < length; i++) {

            let hash = hashes[i],
                equalsIndex = hash.indexOf('='),
                key = hash.substring(0, equalsIndex),
                value = hash.substring(equalsIndex + 1);

            let bracketEnd = key.length - 1;

            if (key.charCodeAt(bracketEnd) == 93) {
                let bracketStart = key.indexOf("[");

                let nestedKey = key.substring(0, bracketStart),
                    nestedKeyValue = key.substring(bracketStart + 1, bracketEnd);

                let arr = vars[nestedKey] || (vars[nestedKey] = []);
                arr[nestedKeyValue === "" ? arr.length : nestedKeyValue] = Util.decodeParamSafe(value);
            } else {
                vars[key] = Util.decodeParamSafe(value);

            }
        }
        return vars;
    }

    public static decodeParamSafe(str: string): string {
        try {
            return decodeURIComponent(str);
        } catch (e) {
            return str;
        }
    }


}

