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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../guard/jwt-auth-guard");
const array_ids_dto_1 = require("../interfaces/category/array-ids.dto");
const create_category_dto_1 = require("../interfaces/category/create-category.dto");
const get_expense_by_category_dto_1 = require("../interfaces/category/get-expense-by-category.dto");
const get_expense_category_dto_1 = require("../interfaces/category/get-expense-category.dto");
const update_category_dto_1 = require("../interfaces/category/update-category.dto");
let CategoryController = class CategoryController {
    constructor(categoryServiceClient) {
        this.categoryServiceClient = categoryServiceClient;
    }
    async createCategory(category, req) {
        var obj1 = { user_id: req.user._id };
        let data = { obj1, category };
        return await this.categoryServiceClient.send({ cmd: "create_category" }, data).toPromise();
    }
    async allCategory(req) {
        let user_id = req.user._id;
        return await this.categoryServiceClient.send({ cmd: "all_category" }, user_id).toPromise();
    }
    async singleCategory(req, params) {
        var obj1 = { user_id: req.user._id };
        let data = { obj1, params };
        return await this.categoryServiceClient.send({ cmd: "get_single_category" }, data).toPromise();
    }
    async updateCategory(req, params, category) {
        var obj1 = { user_id: req.user._id };
        let data = { obj1, params, category };
        return await this.categoryServiceClient.send({ cmd: "update_category" }, data).toPromise();
    }
    async deleteCategory(req, arrayids) {
        var obj1 = { user_id: req.user._id };
        let data = { obj1, arrayids };
        return await this.categoryServiceClient.send({ cmd: "delete_category" }, data).toPromise();
    }
    async getAllExpenseByCategory(req, params) {
        var obj1 = { user_id: req.user._id };
        let data = { obj1, params };
        return await this.categoryServiceClient.send({ cmd: "get_expense_by_category" }, data).toPromise();
    }
    async getAllIncomeByCategory(req, params) {
        var obj1 = { user_id: req.user._id };
        let data = { obj1, params };
        return await this.categoryServiceClient.send({ cmd: "get_income_by_category" }, data).toPromise();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Add Category" }),
    (0, common_1.Post)("/category/add"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.createCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Get All Categories" }),
    (0, common_1.Get)("/category/all"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "allCategory", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Get Single Category" }),
    (0, common_1.Get)("/category/:_id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_expense_category_dto_1.GetCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "singleCategory", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Edit Category" }),
    (0, common_1.Put)("/category/edit/:_id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_expense_category_dto_1.GetCategoryDto, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Delete Categories" }),
    (0, common_1.Delete)("/category/delete/:_id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, array_ids_dto_1.ArrayIds]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Expense With Single Category' }),
    (0, common_1.Get)('/expense/get/:category_id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_expense_by_category_dto_1.getAllExpenseByCategory]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getAllExpenseByCategory", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Income with Single Category' }),
    (0, common_1.Get)('/income/get/:category_id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_expense_by_category_dto_1.getAllExpenseByCategory]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getAllIncomeByCategory", null);
CategoryController = __decorate([
    (0, swagger_1.ApiBearerAuth)('defaultBearerAuth'),
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiTags)("Category"),
    __param(0, (0, common_1.Inject)("CATEGORY_SERVICE")),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map