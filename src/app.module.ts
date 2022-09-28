import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ClientProxyFactory } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { AppService } from './app.service';
import { CategoryController } from './controllers/category.controller';
import { ExpenseController } from './controllers/expense.controller';
import { IncomeController } from './controllers/income.controller';
import { UserController } from './controllers/user.controller';
import { ConfigService } from './services/config/config.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '24h' },
  }),ConfigModule.forRoot()],
  controllers: [
    UserController,
    CategoryController,
    ExpenseController,
    IncomeController
  ],
  providers: [
    JwtStrategy,
    AppService,
    ConfigService,
    {
      provide: "USER_SERVICE",
      useFactory: (configService : ConfigService) =>{
        const userServiceOption = configService.get('userService');
        return ClientProxyFactory.create(userServiceOption);
      },
      inject: [ConfigService]
    },
    {
      provide: "CATEGORY_SERVICE",
      useFactory: (configService:ConfigService) =>{
        const categoryService = configService.get("categoryService");
        return ClientProxyFactory.create(categoryService);
      },
      inject: [ConfigService]
    },
    {
      provide: "EXPENSE_SERVICE",
      useFactory: (configService: ConfigService) =>{
        const expenseService = configService.get("expenseService");
        return ClientProxyFactory.create(expenseService);
      },
      inject: [ConfigService]
    },
    {
      provide: "INCOME_SERVICE",
      useFactory: (configService:ConfigService) =>{
        const incomeService = configService.get("incomeService");
        return ClientProxyFactory.create(incomeService);
      },
      inject: [ConfigService]
    },
    GoogleStrategy
  ],
})
export class AppModule {}
