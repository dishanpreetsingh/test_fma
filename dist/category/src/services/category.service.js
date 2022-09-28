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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_schema_1 = require("src/schemas/category.schema");
const expense_schema_1 = require("src/schemas/expense.schema");
const income_schema_1 = require("src/schemas/income.schema");
const encrypt_util_1 = require("src/utils/encrypt.util");
let CategoryService = class CategoryService {
    constructor(categoryModel, expenseModel, incomeModel) {
        this.categoryModel = categoryModel;
        this.expenseModel = expenseModel;
        this.incomeModel = incomeModel;
    }
    async checkCategoryName(data) {
        let encryptName = (0, encrypt_util_1.encryption)(data.category.name);
        let check = await this.categoryModel.findOne({ user_id: data.obj1.user_id, name: encryptName });
        if (check) {
            if (data.params && check._id.toString().replace(/ObjectId\("(.*)"\)/, "$1") === data.params._id) {
                return "ok";
            }
            else {
                return "exist";
            }
        }
        else {
            return "ok";
        }
    }
    async createCategory(data) {
        try {
            let encryptName = (0, encrypt_util_1.encryption)(data.category.name);
            let checkCategory = await this.categoryModel.findOne({ user_id: data.obj1.user_id, name: encryptName, type: data.category.type });
            if (checkCategory) {
                return "exists";
            }
            else {
                data.category.user_id = data.obj1.user_id;
                data.category.created_at = new Date();
                data.category.updated_at = new Date();
                let newCategory = new this.categoryModel(data.category);
                let saveCategory = await newCategory.save();
                return saveCategory;
            }
        }
        catch (error) {
            return false;
        }
    }
    async allCategory(data) {
        try {
            let category = await this.categoryModel.find({ user_id: data });
            return category;
        }
        catch (error) {
            return false;
        }
    }
    async singleCategory(data) {
        try {
            if (data.params._id.match(/^[0-9a-fA-F]{24}$/)) {
                let category = await this.categoryModel.findOne({ user_id: data.obj1.user_id, _id: data.params._id });
                if (category) {
                    return category;
                }
                else {
                    return false;
                }
            }
            else {
                return "invalid_id";
            }
        }
        catch (error) {
            return false;
        }
    }
    async updateCategory(data) {
        if (data.params._id.match(/^[0-9a-fA-F]{24}$/)) {
            let check_category = await this.checkCategoryName(data);
            if (check_category === "exist") {
                return "exist";
            }
            else {
                data.category.updated_at = new Date();
                let category = await this.categoryModel.findOneAndUpdate({ user_id: data.obj1.user_id, _id: data.params._id }, data.category, { new: true });
                if (category) {
                    return category;
                }
                else {
                    return false;
                }
            }
        }
        else {
            return "invalid_id";
        }
    }
    async getExpenseByCategory(data) {
        if (data.params.category_id.match(/^[0-9a-fA-F]{24}$/)) {
            let expense = await this.expenseModel.find({ user_id: data.obj1.user_id, category: data.params.category_id });
            return expense;
        }
        else {
            return "invalid_id";
        }
    }
    getDifference(array1, array2) {
        return array1.filter(object1 => {
            return !array2.some(object2 => {
                return object1 === object2;
            });
        });
    }
    async getIncomeByCategory(data) {
        if (data.params.category_id.match(/^[0-9a-fA-F]{24}$/)) {
            let income = await this.incomeModel.find({ user_id: data.obj1.user_id, category: data.params.category_id });
            return income;
        }
        else {
            return "invalid_id";
        }
    }
    async deleteCategory(data) {
        try {
            let invalid_ids = [];
            for (let key of data.arrayids._ids) {
                if (!key.match(/^[0-9a-fA-F]{24}$/)) {
                    invalid_ids.push(key);
                }
                else {
                    let check_id = await this.categoryModel.findOne({ user_id: data.obj1.user_id, _id: key });
                    if (!check_id) {
                        invalid_ids.push(key);
                    }
                }
            }
            if (invalid_ids.length) {
                return { message: "invalid_ids", data: invalid_ids };
            }
            else {
                let delete_income_category = await this.categoryModel.deleteMany({ user_id: data.obj1.user_id, _id: { $in: data.arrayids._ids } });
                return { message: "success", data: data.arrayids._ids };
            }
        }
        catch (error) {
            return false;
        }
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __param(1, (0, mongoose_1.InjectModel)(expense_schema_1.Expense.name)),
    __param(2, (0, mongoose_1.InjectModel)(income_schema_1.Income.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _c : Object])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map