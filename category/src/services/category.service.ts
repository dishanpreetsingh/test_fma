import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/schemas/category.schema';
import { Expense, ExpenseDocument } from 'src/schemas/expense.schema';
import { Income, IncomeDocument } from 'src/schemas/income.schema';
import { encryption } from 'src/utils/encrypt.util';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
        @InjectModel(Expense.name) private readonly expenseModel: Model<ExpenseDocument>,
        @InjectModel(Income.name) private readonly incomeModel: Model<IncomeDocument>,
    ) { }

    public async checkCategoryName(data: any): Promise<any> {
        let encryptName = encryption(data.category.name);
        let check = await this.categoryModel.findOne({ user_id: data.obj1.user_id, name: encryptName });
        if (check) {
            if (data.params && check._id.toString().replace(/ObjectId\("(.*)"\)/, "$1") === data.params._id) {
                return "ok"
            } else {
                return "exist"
            }
        } else {
            return "ok"
        }
    }

    public async createCategory(data: any): Promise<any> {
        try {
            let encryptName = encryption(data.category.name);
            let checkCategory = await this.categoryModel.findOne({ user_id: data.obj1.user_id, name: encryptName, type: data.category.type });
            if (checkCategory) {
                return "exists";
            } else {
                data.category.user_id = data.obj1.user_id;
                data.category.created_at = new Date();
                data.category.updated_at = new Date();
                let newCategory = new this.categoryModel(data.category);
                let saveCategory = await newCategory.save();
                return saveCategory;
            }
        } catch (error) {
            return false;
        }
    }
    public async allCategory(data: any): Promise<any> {
        try {
            let category = await this.categoryModel.find({ user_id: data });
            return category;
        } catch (error) {
            return false;
        }
    }

    public async singleCategory(data: any): Promise<any> {
        try {
            if (data.params._id.match(/^[0-9a-fA-F]{24}$/)) {
                let category = await this.categoryModel.findOne({ user_id: data.obj1.user_id, _id: data.params._id });
                if (category) {
                    return category
                } else {
                    return false;
                }
            } else {
                return "invalid_id";
            }

        } catch (error) {
            return false;
        }
    }
    public async updateCategory(data: any): Promise<any> {
        if (data.params._id.match(/^[0-9a-fA-F]{24}$/)) {
            let check_category = await this.checkCategoryName(data);
            if(check_category === "exist"){
                return "exist"
            }else{
                data.category.updated_at = new Date();
                let category = await this.categoryModel.findOneAndUpdate({ user_id: data.obj1.user_id, _id: data.params._id }, data.category, { new: true });
                if (category) {
                    return category
                } else {
                    return false
                }
            }
        } else {
            return "invalid_id"
        }
    }

    public async getExpenseByCategory(data: any): Promise<any> {
        if (data.params.category_id.match(/^[0-9a-fA-F]{24}$/)) {
            let expense = await this.expenseModel.find({ user_id: data.obj1.user_id, category: data.params.category_id });
            return expense;
        } else {
            return "invalid_id"
        }

    }

 
    public getDifference(array1, array2) {
        return array1.filter(object1 => {
            return !array2.some(object2 => {
                return object1 === object2;
            });
        });
    }



    public async getIncomeByCategory(data: any): Promise<any> {
        if (data.params.category_id.match(/^[0-9a-fA-F]{24}$/)) {
            let income = await this.incomeModel.find({ user_id: data.obj1.user_id, category: data.params.category_id });
            return income;
        } else {
            return "invalid_id"
        }

    }


    public async deleteCategory(data:any): Promise<any>{
        try {
            let invalid_ids = [];
            for(let key of data.arrayids._ids){
                if(!key.match(/^[0-9a-fA-F]{24}$/)){
                    invalid_ids.push(key);
                }else{
                    let check_id = await this.categoryModel.findOne({user_id:data.obj1.user_id, _id:key});
                    if(!check_id){
                        invalid_ids.push(key)
                    }
                }
            }
            if(invalid_ids.length){
                return {message: "invalid_ids", data:invalid_ids};
            }else{
                let delete_income_category = await this.categoryModel.deleteMany({user_id:data.obj1.user_id, _id: {$in:data.arrayids._ids}}); 
                return {message: "success", data:data.arrayids._ids}
            }
        } catch (error) {
            return false
        }

    }
}
