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
exports.ExpenseController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const expense_service_1 = require("./services/expense.service");
let ExpenseController = class ExpenseController {
    constructor(expenseService) {
        this.expenseService = expenseService;
    }
    async newExpense(data) {
        let result;
        let expense = await this.expenseService.newExpense(data);
        if (expense && expense != "invalid_payment" && expense != "invalid_category") {
            result = {
                status: common_1.HttpStatus.ACCEPTED,
                message: "Expense Created Successfully",
                expense: expense,
                errors: null,
            };
        }
        else if (expense === "invalid_payment") {
            result = {
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Please Enter Valid Payment Id",
                expense: null,
                errors: null,
            };
        }
        else if (expense === "invalid_category") {
            result = {
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Please Enter Valid Category Id",
                expense: null,
                errors: null,
            };
        }
        else {
            result = {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: "Bad Request",
                expense: null,
                errors: null,
            };
        }
        return result;
    }
    async allExpenses(data) {
        let result;
        try {
            let getAllExpenses = await this.expenseService.getAllExpenses(data);
            if (getAllExpenses.length) {
                result = {
                    status: common_1.HttpStatus.ACCEPTED,
                    message: "All Expenses",
                    expense: getAllExpenses,
                    errors: null
                };
            }
            else {
                result = {
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: "Not Found",
                    expense: null,
                    errors: null
                };
            }
        }
        catch (error) {
            result = {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: "Bad Request",
                expense: null,
                errors: null
            };
        }
        return result;
    }
    async getExpense(data) {
        let result;
        let expense = await this.expenseService.getExpense(data);
        if (expense && expense != "invalid_id") {
            result = {
                status: common_1.HttpStatus.ACCEPTED,
                message: "Expense Found",
                expense: expense,
                errors: null
            };
        }
        else if (expense === "invalid_id") {
            result = {
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Please Enter Valid Expense Id",
                expense: null,
                errors: null
            };
        }
        else {
            result = {
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Not Found",
                expense: null,
                errors: null
            };
        }
        return result;
    }
    async editExpense(data) {
        let expense = await this.expenseService.editExpense(data);
        let result;
        if (expense && expense != "invalid_id" && expense != "invalid_payment" && expense != "invalid_category") {
            result = {
                status: common_1.HttpStatus.ACCEPTED,
                message: "Expense Updated Successfully",
                expense: expense,
                errors: null
            };
        }
        else if (expense === "invalid_id") {
            result = {
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Please Enter Valid Expense Id",
                expense: null,
                errors: null
            };
        }
        else if (expense === "invalid_payment") {
            result = {
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Please Enter Valid Paymen Id",
                expense: null,
                errors: null
            };
        }
        else if (expense === "invalid_category") {
            result = {
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Please Enter Valid Category Id",
                expense: null,
                errors: null
            };
        }
        else {
            result = {
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Not Found",
                expense: null,
                errors: null
            };
        }
        return result;
    }
    async deleteExpense(data) {
        let result;
        let expense = await this.expenseService.deleteExpense(data);
        if (expense && expense != "invalid_id") {
            result = {
                status: common_1.HttpStatus.ACCEPTED,
                message: "Expense Deleted Successfully",
                expense: expense,
                errors: null
            };
        }
        else if (expense === "invalid_id") {
            result = {
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Please Enter Valid Expense Id",
                expense: null,
                errors: null
            };
        }
        else {
            result = {
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Not Found",
                expense: null,
                errors: null
            };
        }
        return result;
    }
};
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "new_expense" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "newExpense", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "all_expenses" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "allExpenses", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "get_expense" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "getExpense", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "edit_expense" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "editExpense", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "delete_expense" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "deleteExpense", null);
ExpenseController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [expense_service_1.ExpenseService])
], ExpenseController);
exports.ExpenseController = ExpenseController;
//# sourceMappingURL=expense.controller.js.map