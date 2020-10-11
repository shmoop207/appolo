import { module, Module} from '@appolo/engine';
import {define, singleton,inject,init,IFactory,factory}  from '@appolo/inject';
import {bootstrapAsync, initAsync} from "@appolo/inject/index";


@module()
export class TestModule extends Module {

    public order:string[] = [];

    public beforeAppInitialize():any {
        this.order.push("beforeAppInitialize")
    }

    public beforeModuleInitialize():any {
        this.order.push("beforeModuleInitialize")

    }

    public beforeModuleLaunch() {
        this.order.push("beforeModuleLaunch")
    }



    @initAsync()
    public onInjectInitialize() {
        this.order.push("onInjectInitialize")
    }

    @bootstrapAsync()
    public onInjectBootstrap() {
        this.order.push("onInjectBootstrap")
    }

    public afterModuleInitialize() {
        this.order.push("afterModuleInitialize")
    }

    public afterAppInitialize():any {
        this.order.push("afterAppInitialize")
    }

    public afterModuleLaunch() {
        this.order.push("afterModuleLaunch")
    }



    public afterAppLaunch():any {
        this.order.push("afterAppLaunch")
    }

    public beforeReset() {
        this.order.push("beforeReset")
    }

    public reset() {
        this.order.push("reset")
    }

}

