import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { fieldEncryption } from "mongoose-field-encryption";
import { IncomeController } from "./income.controller";
import { Category, CategorySchema } from "./schemas/category.schema";
import { Income, IncomeSchema } from "./schemas/income.schema";
import { MongoConfigService } from "./services/config/mongo.config.service";
import { incomeService } from "./services/income.service";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            useClass: MongoConfigService
        }),
        MongooseModule.forFeatureAsync([
            {
                name:Income.name,
                useFactory: () =>{
                    IncomeSchema.plugin(fieldEncryption,{
                        fields: [
                            "amount",
                        ],
                        secret: process.env.ENCRYPT_SECRET_KEY,
                        saltGenerator: function (secret) {
                            return process.env.SALT_GENERATOR_KEY;
                          },
                    });
                    return IncomeSchema
                }
            }
        ]),
        MongooseModule.forFeature([
            {
                name:Category.name,
                schema: CategorySchema
            }
        ])
    ],
    controllers: [IncomeController],
    providers: [incomeService]
})
export class IncomeModule{}