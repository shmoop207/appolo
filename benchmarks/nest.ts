import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get } from '@nestjs/common';

@Controller('hello')
export class HelloController {
    constructor() { }

    @Get('/test/')
    test(): any {
        return "hello world";
    }
}

@Module({
    controllers: [HelloController],
    providers: [],
})
export class HelloModule { }

@Module({
    imports: [HelloModule],
})
export class ApplicationModule { }

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    await app.listen(3000).then(() => console.log("running nest"));
}
bootstrap();