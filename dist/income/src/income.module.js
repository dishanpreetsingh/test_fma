"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_field_encryption_1 = require("mongoose-field-encryption");
const income_controller_1 = require("./income.controller");
const category_schema_1 = require("./schemas/category.schema");
const income_schema_1 = require("./schemas/income.schema");
const mongo_config_service_1 = require("./services/config/mongo.config.service");
const income_service_1 = require("./services/income.service");
let IncomeModule = class IncomeModule {
};
IncomeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRootAsync({
                useClass: mongo_config_service_1.MongoConfigService
            }),
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: income_schema_1.Income.name,
                    useFactory: () => {
                        income_schema_1.IncomeSchema.plugin(mongoose_field_encryption_1.fieldEncryption, {
                            fields: [
                                "amount",
                            ],
                            secret: process.env.ENCRYPT_SECRET_KEY,
                            saltGenerator: function (secret) {
                                return process.env.SALT_GENERATOR_KEY;
                            },
                        });
                        return income_schema_1.IncomeSchema;
                    }
                }
            ]),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: category_schema_1.Category.name,
                    schema: category_schema_1.CategorySchema
                }
            ])
        ],
        controllers: [income_controller_1.IncomeController],
        providers: [income_service_1.incomeService]
    })
], IncomeModule);
exports.IncomeModule = IncomeModule;
//# sourceMappingURL=income.module.js.map