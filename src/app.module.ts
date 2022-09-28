import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot("mongodb+srv://dishanpreet:dishan@cluster0.1j1jojz.mongodb.net/stripe_nestjs?retryWrites=true&w=majority"),
    PaymentsModule,
  ],
})
export class AppModule {}
