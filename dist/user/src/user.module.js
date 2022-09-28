"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_field_encryption_1 = require("mongoose-field-encryption");
const category_scheam_1 = require("./schemas/category.scheam");
const default_category_schema_1 = require("./schemas/default_category.schema");
const user_schema_1 = require("./schemas/user.schema");
const config_service_1 = require("./services/config/config.service");
const mongo_config_service_1 = require("./services/config/mongo.config.service");
const user_services_1 = require("./services/user.services");
const user_controller_1 = require("./user.controller");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRootAsync({
                useClass: mongo_config_service_1.MongoConfigService
            }),
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: user_schema_1.User.name,
                    useFactory: () => {
                        user_schema_1.UserSchema.plugin(mongoose_field_encryption_1.fieldEncryption, {
                            fields: [
                                "name",
                                "email"
                            ],
                            secret: process.env.ENCRYPT_SECRET_KEY,
                            saltGenerator: function (secret) {
                                return process.env.SALT_GENERATOR_KEY;
                            },
                        });
                        return user_schema_1.UserSchema;
                    }
                },
                {
                    name: category_scheam_1.Category.name,
                    useFactory: () => {
                        category_scheam_1.CategorySchema.plugin(mongoose_field_encryption_1.fieldEncryption, {
                            fields: [
                                "name",
                            ],
                            secret: process.env.ENCRYPT_SECRET_KEY,
                            saltGenerator: function (secret) {
                                return process.env.SALT_GENERATOR_KEY;
                            },
                        });
                        return category_scheam_1.CategorySchema;
                    }
                }
            ]),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: default_category_schema_1.default_category.name,
                    schema: default_category_schema_1.defaultCategorySchema
                }
            ])
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_services_1.UserService, config_service_1.ConfigService]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map