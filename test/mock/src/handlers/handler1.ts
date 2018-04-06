import {define,singleton,alias}  from '../../../../index';
import {IHandler} from "./IHandler";

@define()
@singleton()
@alias("IHandler")
export class Handler1 implements IHandler{
    public handle(){
        return 1
    }
}