"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConfigService = void 0;
class MongoConfigService {
    createMongooseOptions() {
        return {
            uri: process.env.MONGO_URI,
            dbName: process.env.MONGO_DATABASE
        };
    }
}
exports.MongoConfigService = MongoConfigService;
//# sourceMappingURL=mongo.config.service.js.map