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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.incomeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_schema_1 = require("src/schemas/category.schema");
const income_schema_1 = require("src/schemas/income.schema");
let incomeService = class incomeService {
    constructor(incomeModel, categoryModel) {
        this.incomeModel = incomeModel;
        this.categoryModel = categoryModel;
    }
    async checkCategoryId(id, user_id) {
        try {
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                let check = await this.categoryModel.findOne({ _id: id, user_id: user_id });
                if (check) {
                    return "ok";
                }
                else {
                    return "invalid_id";
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
    async newIncome(data) {
        let check_category = await this.checkCategoryId(data.posted_data.category, data.obj1.user_id);
        if (check_category === "ok") {
            try {
                data.posted_data.user_id = data.obj1.user_id;
                data.posted_data.created_at = new Date();
                data.posted_data.updated_at = new Date();
                let newIncome = new this.incomeModel(data.posted_data);
                let saveIncome = await newIncome.save();
                return saveIncome;
            }
            catch (error) {
                return false;
            }
        }
        else {
            return "invalid_category";
        }
    }
    async all_incomes(data) {
        try {
            let income = await this.incomeModel.find({ user_id: data.user_id });
            return income;
        }
        catch (error) {
            return false;
        }
    }
    async getIncome(data) {
        if (data.params._id.match(/^[0-9a-fA-F]{24}$/)) {
            let getincome = await this.incomeModel.findOne({ user_id: data.obj1.user_id, _id: data.params._id });
            return getincome;
        }
        else {
            return "invalid_id";
        }
    }
    async edit_income(data) {
        if (data.params._id.match(/^[0-9a-fA-F]{24}$/)) {
            let check_category = await this.checkCategoryId(data.posted_data.category, data.obj1.user_id);
            if (check_category && check_category === "ok") {
                data.posted_data.updated_at = new Date();
                let income = await this.incomeModel.findOneAndUpdate({ user_id: data.obj1.user_id, _id: data.params._id }, data.posted_data, { new: true });
                return income;
            }
            else {
                return "invalid_category";
            }
        }
        else {
            return "invalid_id";
        }
    }
    async deleteIncome(data) {
        if (data.params._id.match(/^[0-9a-fA-F]{24}$/)) {
            let income = await this.incomeModel.findOneAndDelete({ user_id: data.obj1.user_id, _id: data.params._id });
            return income;
        }
        else {
            return "invalid_id";
        }
    }
};
incomeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(income_schema_1.Income.name)),
    __param(1, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], incomeService);
exports.incomeService = incomeService;
//# sourceMappingURL=income.service.js.map