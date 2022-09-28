import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { fieldEncryption } from 'mongoose-field-encryption';
import { CategoryController } from './category.controller';
import { Category, CategorySchema } from './schemas/category.schema';
import { Expense, ExpenseSchema } from './schemas/expense.schema';
import { Income, IncomeSchema } from './schemas/income.schema';
import { CategoryService } from './services/category.service';
import { MongoConfigService } from './services/config/mongo.config.service';

@Module({
    imports:[
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            useClass: MongoConfigService
        }),
        MongooseModule.forFeatureAsync([
            {
                name: Category.name,
                useFactory: () => {
                    CategorySchema.plugin(fieldEncryption, {
                        fields: [
                            "name",
                        ],
                        secret: process.env.ENCRYPT_SECRET_KEY,
                        saltGenerator: function (secret) {
                            return process.env.SALT_GENERATOR_KEY;
                          },
                    });
                    return CategorySchema
                }
            },
            {
                name: Expense.name,
                useFactory: () => {
                    ExpenseSchema.plugin(fieldEncryption, {
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
            {
                name: Income.name,
                useFactory: () => {
                    IncomeSchema.plugin(fieldEncryption, {
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
        ])
    ],
    controllers: [CategoryController],
    providers: [CategoryService]
})
export class CategoryModule {}
