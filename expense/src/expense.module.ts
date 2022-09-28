import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { fieldEncryption } from "mongoose-field-encryption";
import { ExpenseController } from "./expense.controller";
import { Category, CategorySchema } from "./schemas/category.schema";
import { Expense, ExpenseSchema } from "./schemas/expense.schema";
import { Payment, PaymentSchema } from "./schemas/payment.schema";
import { MongoConfigService } from "./services/config/mongo.config.service";
import { ExpenseService } from "./services/expense.service";

@Module({
    imports:[
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            useClass: MongoConfigService
        }),
        MongooseModule.forFeatureAsync([
            {
                name:Expense.name,
                useFactory: () =>{
                    ExpenseSchema.plugin(fieldEncryption,{
                        fields: [
                            "amount",
                        ],
                        secret: process.env.ENCRYPT_SECRET_KEY,
                        saltGenerator: function (secret) {
                            return process.env.SALT_GENERATOR_KEY;
                          },
                    });
                    return ExpenseSchema
                }
            },
        ]),
        MongooseModule.forFeature([
            {
                name: Payment.name,
                schema: PaymentSchema
            },
            {
                name: Category.name,
                schema: CategorySchema
            }
        ])
    ],
    controllers: [ExpenseController],
    providers: [ExpenseService, ]
})

export class ExpenseModule {}