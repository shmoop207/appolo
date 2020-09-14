// import {IRouteOptions} from "../interfaces/IRouteOptions";
// import {Hooks, MiddlewareHandlerParams, Request, Response} from "appolo-agent";
// import {IMiddlewareCtr, MiddlewareType} from "../interfaces/IMiddleware";
// import {invokeMiddleWare, invokeMiddleWareData, invokeMiddleWareError} from "../routes/invokeActionMiddleware";
//
// import {Util as EngineUtils} from '@appolo/engine';
//
// export class Util  {
//
//     // public static convertSnakeCaseToCamelCase(str: string) {
//     //     return str.replace(/(\_\w)/g, function (m) {
//     //         return m[1].toUpperCase();
//     //     });
//     // }
//     //
//     // public static convertModelToCamelCase(model: any): any {
//     //
//     //     let keys = Object.keys(model);
//     //
//     //     let output = {};
//     //
//     //     for (let i = 0, len = keys.length; i < len; i++) {
//     //         let key = keys[i];
//     //         output[Util.convertSnakeCaseToCamelCase(key)] = model[key]
//     //     }
//     //     return output
//     // }
//     //
//
//     // public static isClass(v: any): boolean {
//     //     return typeof v === 'function' && v.name && /^\s*class\s+/.test(v.toString());
//     // }
//
//     public static reverseMiddleware(route: Partial<IRouteOptions>) {
//         Object.keys(route || {}).forEach(key => {
//             let value = route[key];
//             //we need to insert middlewares in reverse order
//             if (key == "middleware") {
//                 route[key] = {
//                     middleware: Array.isArray(value) ? value.reverse() : value,
//                     order: "head"
//                 } as any
//             }
//         });
//     }
//
//
//
//
//     public static convertMiddleware(middleware: (string | MiddlewareHandlerParams | IMiddlewareCtr)[], type: MiddlewareType): MiddlewareHandlerParams[] {
//
//         let output: MiddlewareHandlerParams[] = [];
//
//         for (let i = 0, len = middleware.length; i < len; i++) {
//
//             let dto = middleware[i] as MiddlewareHandlerParams;
//
//             let id = EngineUtils.getClassId(middleware[i]);
//
//             if (id) {
//                 dto = type == MiddlewareType.MiddleWare ? invokeMiddleWare(id) : type == MiddlewareType.Error ? invokeMiddleWareError(id) : invokeMiddleWareData(id)
//             }
//
//             output.push(dto);
//         }
//
//         return output
//     }
//
//     public static convertMiddlewareHooks(name: Hooks, hooks: (string | MiddlewareHandlerParams | IMiddlewareCtr)[]): MiddlewareHandlerParams[] {
//         return Util.convertMiddleware(hooks, name == Hooks.OnSend ? MiddlewareType.Data : name == Hooks.OnError ? MiddlewareType.Error : MiddlewareType.MiddleWare);
//
//     }
//
//
// }
//
