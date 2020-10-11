import {IHandler} from "./IHandler";
import { inject,define,singleton,override,lazy,alias} from '@appolo/inject';

@define()
@singleton()
@alias("IHandler")
export class Handler1 implements IHandler{
    public handle(){
        return 1
    }
}
