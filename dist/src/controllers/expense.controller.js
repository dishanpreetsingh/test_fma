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
exports.ExpenseController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../guard/jwt-auth-guard");
const get_expense_dto_1 = require("../interfaces/expense/get-expense.dto");
const get_filter_expense_dto_1 = require("../interfaces/expense/get-filter-expense.dto");
const new_expense_dto_1 = require("../interfaces/expense/new-expense.dto");
let ExpenseController = class ExpenseController {
    constructor(expenseServiceClient) {
        this.expenseServiceClient = expenseServiceClient;
    }
    async newExpense(new_expense, req) {
        let obj1 = { user_id: req.user._id };
        let data = { obj1, new_expense };
        return await this.expenseServiceClient.send({ cmd: "new_expense" }, data).toPromise();
    }
    async allExpenses(req, query) {
        let obj1 = { user_id: req.user._id, query };
        return await this.expenseServiceClient.send({ cmd: "all_expenses" }, obj1).toPromise();
    }
    async getExpense(req, params) {
        let obj1 = { user_id: req.user._id };
        let data = { obj1, params };
        return await this.expenseServiceClient.send({ cmd: "get_expense" }, data).toPromise();
    }
    async editExpense(req, params, posted_data) {
        let obj1 = { user_id: req.user._id };
        let data = { obj1, params, posted_data };
        return await this.expenseServiceClient.send({ cmd: "edit_expense" }, data);
    }
    async deleteExpense(req, params) {
        let obj1 = { user_id: req.user._id };
        let data = { obj1, params };
        return await this.expenseServiceClient.send({ cmd: "delete_expense" }, data).toPromise();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add Expense' }),
    (0, common_1.Post)("/add"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_expense_dto_1.NewExpenseDto, Object]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "newExpense", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Expense' }),
    (0, common_1.Get)("/all"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_filter_expense_dto_1.GetFilterExpenseDto]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "allExpenses", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Single Expense' }),
    (0, common_1.Get)("/:_id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_expense_dto_1.GetExpenseDto]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "getExpense", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Edit Single Expense' }),
    (0, common_1.Put)("/edit/:_id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_expense_dto_1.GetExpenseDto, new_expense_dto_1.NewExpenseDto]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "editExpense", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete Single Expense' }),
    (0, common_1.Delete)("/delete/:_id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_expense_dto_1.GetExpenseDto]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "deleteExpense", null);
ExpenseController = __decorate([
    (0, swagger_1.ApiBearerAuth)("defaultBearerAuth"),
    (0, common_1.Controller)("expense"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiTags)("Expense"),
    __param(0, (0, common_1.Inject)("EXPENSE_SERVICE")),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], ExpenseController);
exports.ExpenseController = ExpenseController;
//# sourceMappingURL=expense.controller.js.map