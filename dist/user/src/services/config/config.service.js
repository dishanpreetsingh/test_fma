"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
class ConfigService {
    constructor() {
        this.envConfig = null;
        this.envConfig = {
            port: process.env.USER_SERVICE_PORT || 5002,
        };
        this.envConfig.baseUri = process.env.BASE_URI || '0.0.0.0';
        this.envConfig.gatewayPort = process.env.API_GATEWAY_PORT || 5000;
    }
    get(key) {
        return this.envConfig[key];
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map