import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { CategoryModule } from './category.module';
import { ConfigService } from './services/config/config.service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(CategoryModule,{
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: new ConfigService().get("port")
    }
  } as TcpOptions);
  await app.listen();
}
bootstrap();
