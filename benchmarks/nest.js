"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
let HelloController = class HelloController {
    constructor() { }
    test() {
        return "hello world";
    }
};
tslib_1.__decorate([
    common_1.Get('/test/')
], HelloController.prototype, "test", null);
HelloController = tslib_1.__decorate([
    common_1.Controller('hello')
], HelloController);
exports.HelloController = HelloController;
let HelloModule = class HelloModule {
};
HelloModule = tslib_1.__decorate([
    common_1.Module({
        controllers: [HelloController],
        providers: [],
    })
], HelloModule);
exports.HelloModule = HelloModule;
let ApplicationModule = class ApplicationModule {
};
ApplicationModule = tslib_1.__decorate([
    common_1.Module({
        imports: [HelloModule],
    })
], ApplicationModule);
exports.ApplicationModule = ApplicationModule;
async function bootstrap() {
    const app = await core_1.NestFactory.create(ApplicationModule);
    await app.listen(3000).then(() => console.log("running nest"));
}
bootstrap();
//# sourceMappingURL=nest.js.map