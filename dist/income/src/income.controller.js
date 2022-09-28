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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const income_service_1 = require("./services/income.service");
let IncomeController = class IncomeController {
    constructor(incomeService) {
        this.incomeService = incomeService;
    }
    async createIncome(data) {
        let result;
        let income = await this.incomeService.newIncome(data);
        if (income && income != "invalid_payment" && income != "invalid_category") {
            result = {
                status: common_1.HttpStatus.ACCEPTED,
                message: "Income Created Successfully",
                income: income,
                errors: null
            };
        }
        else if (income === "invalid_payment") {
            result = {
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Please Enter Valid Payment Id",
                income: null,
                errors: null
            };
        }
        else if (income === "invalid_category") {
            result = {
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Please Enter Valid Category Id",
                income: null,
                errors: null
            };
        }
        else {
            result = {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: "Bad Request",
                income: null,
                errors: null
            };
        }
        return result;
    }
    async allIncomes(data) {
        let result;
        let incomes = await this.incomeService.all_incomes(data);
        if (incomes) {
            result = {
                status: common_1.HttpStatus.FOUND,
                message: "All Incomes",
                income: incomes,
                errors: null
            };
        }
        else {
            result = {
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Not Found",
                income: null,
                errors: null
            };
        }
        return result;
    }
    async getIncome(data) {
        let result;
        let income = await this.incomeService.getIncome(data);
        if (income && income != "invalid_id") {
            result = {
                status: common_1.HttpStatus.FOUND,
                message: "Income Found",
                income: income,
                errors: null
            };
        }
        else if (income === "invalid_id") {
            result = {
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Please Enter Valid Income Id",
                income: null,
                errors: null
            };
        }
        else {
            result = {
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Not Found",
                income: null,
                errors: null
            };
        }
        return result;
    }
    async editIncome(data) {
        let result;
        let income = await this.incomeService.edit_income(data);
        if (income && income != "invalid_id" && income != "invalid_payment" && income != "invalid_category") {
            result = {
                status: common_1.HttpStatus.ACCEPTED,
                message: "Income Updated Successfully",
                income: income,
                errors: null
            };
        }
        else if (income === "invalid_id") {
            result = {
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Please Enter Valid Income Id",
                income: null,
                errors: null
            };
        }
        else if (income === "invalid_payment") {
            result = {
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Please Enter Valid Payment Id",
                income: null,
                errors: null
            };
        }
        else if (income === "invalid_category") {
            result = {
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Please Enter Valid Category Id",
                income: null,
                errors: null
            };
        }
        else {
            result = {
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Not Found",
                income: null,
                errors: null
            };
        }
        return result;
    }
    async deleteIncome(data) {
        let result;
        let delete_income = await this.incomeService.deleteIncome(data);
        if (delete_income && delete_income != "invalid_id") {
            result = {
                status: common_1.HttpStatus.ACCEPTED,
                message: "Income Deleted Successfully",
                income: delete_income,
                errors: null
            };
        }
        else if (delete_income === "invalid_id") {
            result = {
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Please Enter Valid Income Id",
                income: null,
                errors: null
            };
        }
        else {
            result = {
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Not Found",
                income: null,
                errors: null
            };
        }
        return result;
    }
};
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "new_income" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IncomeController.prototype, "createIncome", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "all_incomes" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IncomeController.prototype, "allIncomes", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "get_income" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IncomeController.prototype, "getIncome", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "edit_income" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IncomeController.prototype, "editIncome", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "delete_income" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IncomeController.prototype, "deleteIncome", null);
IncomeController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [income_service_1.incomeService])
], IncomeController);
exports.IncomeController = IncomeController;
//# sourceMappingURL=income.controller.js.map