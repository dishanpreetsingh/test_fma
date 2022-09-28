import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
  .setTitle('Stripe With Nestjs')
  .setDescription('Implementing Stripe Payment Gateway with Nestjs')
  .setVersion('3.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log("listen",process.env.PORT);
  await app.listen(process.env.PORT);
}
bootstrap();
