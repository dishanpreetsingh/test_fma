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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_scheam_1 = require("src/schemas/category.scheam");
const default_category_schema_1 = require("src/schemas/default_category.schema");
const user_schema_1 = require("src/schemas/user.schema");
let UserService = class UserService {
    constructor(userModel, CategoryModel, defaultCategoryModel) {
        this.userModel = userModel;
        this.CategoryModel = CategoryModel;
        this.defaultCategoryModel = defaultCategoryModel;
    }
    async createCategory(user_id) {
        if (user_id.toString().replace(/ObjectId\("(.*)"\)/, "$1")) {
            user_id = user_id.toString().replace(/ObjectId\("(.*)"\)/, "$1");
            try {
                let category = await this.defaultCategoryModel.find({}, { _id: 0 });
                for (let key of category) {
                    key['user_id'] = user_id;
                    key['created_at'] = new Date();
                    key['updated_at'] = new Date();
                    let newCategory = new this.CategoryModel(key);
                    newCategory.isNew = true;
                    let saveCategory = await newCategory.save();
                }
                return "ok";
            }
            catch (error) {
                return false;
            }
        }
        else {
            return false;
        }
    }
    async createUser(data) {
        try {
            let date = new Date();
            data.created_at = date;
            data.updated_at = date;
            let checkUser = await this.userModel.findOne({ google_id: data.google_id });
            if (checkUser) {
                return checkUser;
            }
            else {
                let newUser = new this.userModel(data);
                let create_category = await this.createCategory(newUser._id);
                if (create_category) {
                    let saveUser = await newUser.save();
                    return saveUser;
                }
                else {
                    return "Server Error";
                }
            }
        }
        catch (error) {
            return false;
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(category_scheam_1.Category.name)),
    __param(2, (0, mongoose_1.InjectModel)(default_category_schema_1.default_category.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _c : Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.services.js.map