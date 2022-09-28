import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";
export declare class MongoConfigService implements MongooseOptionsFactory {
    createMongooseOptions(): MongooseModuleOptions;
}
