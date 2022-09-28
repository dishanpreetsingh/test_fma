"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Stripe With Nestjs')
        .setDescription('Implementing Stripe Payment Gateway with Nestjs')
        .setVersion('3.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    console.log("listen", process.env.PORT);
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map