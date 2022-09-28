import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from './services/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
  .setTitle('FMA API docs')
  .setVersion('3.1')
  .addBearerAuth(
    {
      description: 'Default JWT Authorization',
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
    'defaultBearerAuth',
  )
  .build();
const document = SwaggerModule.createDocument(app, options);
// SwaggerModule.setup('docs', app, document);
SwaggerModule.setup('docs', app, document, {
  swaggerOptions: { defaultModelsExpandDepth: -1 },
});
  await app.listen(new ConfigService().get('port'));
}
bootstrap();
