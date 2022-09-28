"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const microservices_1 = require("@nestjs/microservices");
const passport_1 = require("@nestjs/passport");
const app_service_1 = require("./app.service");
const category_controller_1 = require("./controllers/category.controller");
const expense_controller_1 = require("./controllers/expense.controller");
const income_controller_1 = require("./controllers/income.controller");
const user_controller_1 = require("./controllers/user.controller");
const config_service_1 = require("./services/config/config.service");
const google_strategy_1 = require("./strategy/google.strategy");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: 'secret',
                signOptions: { expiresIn: '24h' },
            }), config_1.ConfigModule.forRoot()
        ],
        controllers: [
            user_controller_1.UserController,
            category_controller_1.CategoryController,
            expense_controller_1.ExpenseController,
            income_controller_1.IncomeController
        ],
        providers: [
            jwt_strategy_1.JwtStrategy,
            app_service_1.AppService,
            config_service_1.ConfigService,
            {
                provide: "USER_SERVICE",
                useFactory: (configService) => {
                    const userServiceOption = configService.get('userService');
                    return microservices_1.ClientProxyFactory.create(userServiceOption);
                },
                inject: [config_service_1.ConfigService]
            },
            {
                provide: "CATEGORY_SERVICE",
                useFactory: (configService) => {
                    const categoryService = configService.get("categoryService");
                    return microservices_1.ClientProxyFactory.create(categoryService);
                },
                inject: [config_service_1.ConfigService]
            },
            {
                provide: "EXPENSE_SERVICE",
                useFactory: (configService) => {
                    const expenseService = configService.get("expenseService");
                    return microservices_1.ClientProxyFactory.create(expenseService);
                },
                inject: [config_service_1.ConfigService]
            },
            {
                provide: "INCOME_SERVICE",
                useFactory: (configService) => {
                    const incomeService = configService.get("incomeService");
                    return microservices_1.ClientProxyFactory.create(incomeService);
                },
                inject: [config_service_1.ConfigService]
            },
            google_strategy_1.GoogleStrategy
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map