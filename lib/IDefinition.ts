import {IDefinition} from 'appolo-inject';

export interface IDefinition extends IDefinition{
    id?:string
    namespace?:string
    mixins?:Function|Function[]
    statics?:{[index:string]:any}

}