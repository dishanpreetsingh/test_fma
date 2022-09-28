"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const microservices_1 = require("@nestjs/microservices");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const app_service_1 = require("../app.service");
const create_user_dto_1 = require("../interfaces/user/create-user.dto");
let UserController = class UserController {
    constructor(appService, userServiceClient, jwtService) {
        this.appService = appService;
        this.userServiceClient = userServiceClient;
        this.jwtService = jwtService;
    }
    async register(userRegister) {
        return await this.userServiceClient.send({ cmd: "user_register" }, userRegister).toPromise();
    }
    async googleAuth(userRequest) { }
    async googleAuthRedirect(req) {
        let user = await this.register(req.user);
        if (user) {
            let payload = { user: user.name, _id: user._id };
            var token = this.jwtService.sign(payload);
            return { token, user };
        }
    }
};
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Login With Google' }),
    (0, common_1.Get)('/login'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "googleAuth", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Redirect Page' }),
    (0, common_1.Get)('/google/redirect'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "googleAuthRedirect", null);
UserController = __decorate([
    (0, swagger_1.ApiBearerAuth)('defaultBearerAuth'),
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)("User"),
    __param(1, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [app_service_1.AppService,
        microservices_1.ClientProxy,
        jwt_1.JwtService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map