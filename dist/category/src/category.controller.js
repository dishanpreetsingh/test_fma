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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const category_service_1 = require("./services/category.service");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async createCategory(data) {
        let result;
        let category = await this.categoryService.createCategory(data);
        if (category && category != "exists") {
            result = {
                status: common_1.HttpStatus.ACCEPTED,
                message: "Category Created Successfully",
                category: category,
                errors: null
            };
        }
        else if (category === "exists") {
            result = {
                status: common_1.HttpStatus.CONFLICT,
                message: "Category Already Exists",
                category: null,
                errors: null
            };
        }
        else {
            result = {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: "Bad Request",
                category: null,
                errors: null
            };
        }
        return result;
    }
    async allCategory(data) {
        let result;
        let category = await this.categoryService.allCategory(data);
        if (category.length) {
            result = {
                status: common_1.HttpStatus.FOUND,
                message: "All Categories",
                category: category,
                errors: null
            };
        }
        else {
            result = {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: "Bad Request",
                category: null,
                errors: null
            };
        }
        return result;
    }
    async getSingleCategory(data) {
        let result;
        try {
            let category = await this.categoryService.singleCategory(data);
            if (category && category != "invalid_id") {
                result = {
                    status: common_1.HttpStatus.FOUND,
                    message: "Category Found",
                    category: category,
                    errors: null
                };
            }
            else if (category === "invalid_id") {
                result = {
                    status: common_1.HttpStatus.NOT_ACCEPTABLE,
                    message: "Please Enter Valid Category Id",
                    category: null,
                    errors: null
                };
            }
            else {
                result = {
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: "Not Found",
                    category: null,
                    errors: null
                };
            }
        }
        catch (error) {
            result = {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: "BAD REQUEST",
                category: null,
                errors: null
            };
        }
        return result;
    }
    async updateCategory(data) {
        let result;
        try {
            let category = await this.categoryService.updateCategory(data);
            if (category && category != "invalid_id" && category != "exist") {
                result = {
                    status: common_1.HttpStatus.ACCEPTED,
                    message: "This Category Updated Successfully",
                    category: category,
                    errors: null
                };
            }
            else if (category === "invalid_id") {
                result = {
                    status: common_1.HttpStatus.NOT_ACCEPTABLE,
                    message: "Please Enter Valid Category Id",
                    category: null,
                    errors: null
                };
            }
            else if (category === "exist") {
                result = {
                    status: common_1.HttpStatus.CONFLICT,
                    message: "Category Already Exists",
                    category: null,
                    errors: null
                };
            }
            else {
                result = {
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: "Not Found",
                    category: null,
                    errors: null
                };
            }
        }
        catch (error) {
            result = {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: "BAD REQUEST",
                category: null,
                errors: null
            };
        }
        return result;
    }
    async deleteCategory(data) {
        let result;
        try {
            let category = await this.categoryService.deleteCategory(data);
            if (category.message === "success" && category.message != "invalid_ids") {
                result = {
                    status: common_1.HttpStatus.ACCEPTED,
                    message: "This Categories Deleted Successfully",
                    category: category.data,
                    errors: null
                };
            }
            else if (category.message === "invalid_ids") {
                result = {
                    status: common_1.HttpStatus.NOT_ACCEPTABLE,
                    message: "Please Enter Valid Category Ids",
                    category: category.data,
                    errors: null
                };
            }
            else {
                result = {
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: "Not Found",
                    category: null,
                    errors: null
                };
            }
        }
        catch (error) {
            result = {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: "BAD REQUEST",
                category: null,
                errors: null
            };
        }
        return result;
    }
    async getExpenseByCategory(data) {
        let result;
        let expense = await this.categoryService.getExpenseByCategory(data);
        if (expense.length && expense != "invalid_id") {
            result = {
                status: common_1.HttpStatus.ACCEPTED,
                message: "All Expense By This Category",
                expense: expense,
                errors: null
            };
        }
        else if (expense === "invalid_id") {
            result = {
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Please Enter The Valid Category Id",
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
    async getIncomeeByCategory(data) {
        let result;
        let income = await this.categoryService.getIncomeByCategory(data);
        if (income.length && income != "invalid_id") {
            result = {
                status: common_1.HttpStatus.ACCEPTED,
                message: "All income By This Category",
                income: income,
                errors: null
            };
        }
        else if (income === "invalid_id") {
            result = {
                status: common_1.HttpStatus.NOT_FOUND,
                message: "Please Enter The Valid Category Id",
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
    (0, microservices_1.MessagePattern)({ cmd: "create_category" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "all_category" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "allCategory", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "get_single_category" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getSingleCategory", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "update_category" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "delete_category" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "get_expense_by_category" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getExpenseByCategory", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "get_income_by_category" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getIncomeeByCategory", null);
CategoryController = __decorate([
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map