import {define,singleton,alias}  from '../../../../index' ;
import {IHandler} from "./IHandler";

@define()
@singleton()
@alias("IHandler")
export class Handler2 implements IHandler{
    public handle(){
        return 2
    }
}