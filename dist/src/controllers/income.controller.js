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
exports.IncomeController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../guard/jwt-auth-guard");
const get_income_dto_1 = require("../interfaces/income/get-income.dto");
const new_income_dto_1 = require("../interfaces/income/new-income.dto");
let IncomeController = class IncomeController {
    constructor(incomeService) {
        this.incomeService = incomeService;
    }
    async createIncome(req, posted_data) {
        let obj1 = { user_id: req.user._id };
        let data = { obj1, posted_data };
        return await this.incomeService.send({ cmd: "new_income" }, data).toPromise();
    }
    async getAllIncomes(req) {
        let obj1 = { user_id: req.user._id };
        return await this.incomeService.send({ cmd: "all_incomes" }, obj1).toPromise();
    }
    async getIncome(req, params) {
        let obj1 = { user_id: req.user._id };
        let data = { obj1, params };
        return await this.incomeService.send({ cmd: "get_income" }, data).toPromise();
    }
    async editIncome(req, params, posted_data) {
        let obj1 = { user_id: req.user._id };
        let data = { obj1, params, posted_data };
        return await this.incomeService.send({ cmd: "edit_income" }, data).toPromise();
    }
    async deleteIncome(req, params) {
        let obj1 = { user_id: req.user._id };
        let data = { obj1, params };
        return await this.incomeService.send({ cmd: "delete_income" }, data).toPromise();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add Income' }),
    (0, common_1.Post)("/add"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, new_income_dto_1.NewIncomeDto]),
    __metadata("design:returntype", Promise)
], IncomeController.prototype, "createIncome", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Income' }),
    (0, common_1.Get)("/all"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IncomeController.prototype, "getAllIncomes", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Single Income' }),
    (0, common_1.Get)("/:_id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_income_dto_1.GetIncomeDto]),
    __metadata("design:returntype", Promise)
], IncomeController.prototype, "getIncome", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Edit Single Income' }),
    (0, common_1.Put)("/edit/:_id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_income_dto_1.GetIncomeDto, new_income_dto_1.NewIncomeDto]),
    __metadata("design:returntype", Promise)
], IncomeController.prototype, "editIncome", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete Single Income' }),
    (0, common_1.Delete)("/delete/:_id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_income_dto_1.GetIncomeDto]),
    __metadata("design:returntype", Promise)
], IncomeController.prototype, "deleteIncome", null);
IncomeController = __decorate([
    (0, swagger_1.ApiBearerAuth)("defaultBearerAuth"),
    (0, common_1.Controller)("income"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiTags)("Income"),
    __param(0, (0, common_1.Inject)("INCOME_SERVICE")),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], IncomeController);
exports.IncomeController = IncomeController;
//# sourceMappingURL=income.controller.js.map