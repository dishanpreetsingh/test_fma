import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { fieldEncryption } from "mongoose-field-encryption";
import { Category, CategorySchema } from "./schemas/category.scheam";
import { defaultCategorySchema, default_category } from "./schemas/default_category.schema";
import { User, UserSchema } from "./schemas/user.schema";
import { ConfigService } from "./services/config/config.service";
import { MongoConfigService } from "./services/config/mongo.config.service";
import { UserService } from "./services/user.services";
import { UserController } from "./user.controller";


@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            useClass: MongoConfigService
        }),
        MongooseModule.forFeatureAsync([
            {
                name: User.name,
                useFactory: () => {
                    UserSchema.plugin(fieldEncryption, {
                        fields: [
                            "name",
                            "email"
                        ],
                        secret: process.env.ENCRYPT_SECRET_KEY,
                        saltGenerator: function (secret) {
                            return process.env.SALT_GENERATOR_KEY;
                          },
                    });
                    return UserSchema
                }
            },
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
            }
        ]),
        MongooseModule.forFeature([
            {
                name: default_category.name,
                schema: defaultCategorySchema
            }
        ])
    ],
    controllers: [UserController],
    providers: [UserService, ConfigService]
})
export class UserModule {}