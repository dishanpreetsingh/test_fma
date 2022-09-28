import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { IncomeModule } from './income.module';
import { ConfigService } from './services/config/config.service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(IncomeModule,{
    transport : Transport.TCP,
    options:{
      host: "0.0.0.0",
      port: new ConfigService().get("port")
    }
  } as TcpOptions)
  await app.listen();
}
bootstrap();
