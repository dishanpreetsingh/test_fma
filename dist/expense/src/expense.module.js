"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_field_encryption_1 = require("mongoose-field-encryption");
const expense_controller_1 = require("./expense.controller");
const category_schema_1 = require("./schemas/category.schema");
const expense_schema_1 = require("./schemas/expense.schema");
const payment_schema_1 = require("./schemas/payment.schema");
const mongo_config_service_1 = require("./services/config/mongo.config.service");
const expense_service_1 = require("./services/expense.service");
let ExpenseModule = class ExpenseModule {
};
ExpenseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRootAsync({
                useClass: mongo_config_service_1.MongoConfigService
            }),
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: expense_schema_1.Expense.name,
                    useFactory: () => {
                        expense_schema_1.ExpenseSchema.plugin(mongoose_field_encryption_1.fieldEncryption, {
                            fields: [
                                "amount",
                            ],
                            secret: process.env.ENCRYPT_SECRET_KEY,
                            saltGenerator: function (secret) {
                                return process.env.SALT_GENERATOR_KEY;
                            },
                        });
                        return expense_schema_1.ExpenseSchema;
                    }
                },
            ]),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: payment_schema_1.Payment.name,
                    schema: payment_schema_1.PaymentSchema
                },
                {
                    name: category_schema_1.Category.name,
                    schema: category_schema_1.CategorySchema
                }
            ])
        ],
        controllers: [expense_controller_1.ExpenseController],
        providers: [expense_service_1.ExpenseService,]
    })
], ExpenseModule);
exports.ExpenseModule = ExpenseModule;
//# sourceMappingURL=expense.module.js.map