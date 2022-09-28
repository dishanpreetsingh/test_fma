import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category, CategoryDocument } from "src/schemas/category.schema";
import { Income, IncomeDocument } from "src/schemas/income.schema";

@Injectable()
export class incomeService {
    constructor(
        @InjectModel(Income.name) private readonly incomeModel:Model<IncomeDocument>,
        @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
    ) {}

    public async checkCategoryId(id:any,user_id:any):Promise<any> {
        try {
            if(id.match(/^[0-9a-fA-F]{24}$/)){
                let check = await this.categoryModel.findOne({_id:id,user_id:user_id});
                if(check){
                    return "ok"
                }else{
                    return "invalid_id"
                }
            }else{
                return "invalid_id"
            }
        } catch (error) {
            return false
        }
    }

    public async newIncome(data:any):Promise<any> {
            let check_category = await this.checkCategoryId(data.posted_data.category,data.obj1.user_id);
            if(check_category === "ok"){
                try {
                    data.posted_data.user_id = data.obj1.user_id;
                    data.posted_data.created_at = new Date();
                    data.posted_data.updated_at = new Date();
                    let newIncome = new this.incomeModel(data.posted_data);
                    let saveIncome = await newIncome.save();
                    return saveIncome;
                } catch (error) {
                    return false
                }
            }else{
                return "invalid_category"
            }

    }

    public async all_incomes(data:any): Promise<any>{
        try {
            let income = await this.incomeModel.find({user_id:data.user_id});
            return income;
        } catch (error) {
            return false;
        }
    }

    public async getIncome(data:any): Promise<any> {
        if(data.params._id.match(/^[0-9a-fA-F]{24}$/)){
        let getincome = await this.incomeModel.findOne({user_id:data.obj1.user_id,_id:data.params._id});
        return getincome;
        }else{
            return "invalid_id";
        }
    }

    public async edit_income(data:any): Promise<any> {
        if(data.params._id.match(/^[0-9a-fA-F]{24}$/)){
                let check_category = await this.checkCategoryId(data.posted_data.category,data.obj1.user_id);
                if(check_category && check_category === "ok"){
                    data.posted_data.updated_at = new Date();
                    let income = await this.incomeModel.findOneAndUpdate({user_id:data.obj1.user_id, _id:data.params._id}, data.posted_data, {new:true});
                    return income;
                }else{
                    return "invalid_category"
                }
            
        }else{
            return "invalid_id"
        }
    }

    public async deleteIncome(data:any):Promise<any>{
        if(data.params._id.match(/^[0-9a-fA-F]{24}$/)){
            let income = await this.incomeModel.findOneAndDelete({user_id:data.obj1.user_id,_id:data.params._id});
            return income;
        }else{
            return "invalid_id"
        }
    }
}