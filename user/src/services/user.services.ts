import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category, CategoryDocument } from "src/schemas/category.scheam";
import { defaultCategoryDocument, default_category } from "src/schemas/default_category.schema";
import { User, UserDocument } from "src/schemas/user.schema";

@Injectable()
export class UserService {

    constructor(
            @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
            @InjectModel(Category.name) private readonly CategoryModel: Model<CategoryDocument>,
            @InjectModel(default_category.name) private readonly defaultCategoryModel: Model<defaultCategoryDocument>
        ) {}

    public async createCategory(user_id:any):Promise<any>{
        if(user_id.toString().replace(/ObjectId\("(.*)"\)/, "$1")){
            user_id = user_id.toString().replace(/ObjectId\("(.*)"\)/, "$1");
            try {
                let category = await this.defaultCategoryModel.find({},{_id:0});
                for(let key of category){
                    key['user_id'] = user_id;
                    key['created_at'] = new Date();
                    key['updated_at'] = new Date();
                    let newCategory = new this.CategoryModel(key);
                    newCategory.isNew = true; 
                    let saveCategory = await newCategory.save();
                }
                return "ok";
            } catch (error) {
                return false
            }
        }else{
            return false
        }
        
    }

    public async createUser(data:any):Promise<any>{
        try {
            let date = new Date();
            data.created_at = date;
            data.updated_at = date;
            let checkUser = await this.userModel.findOne({google_id:data.google_id});
            if(checkUser){
                return checkUser;
            }else{
                let newUser = new this.userModel(data);
                let create_category = await this.createCategory(newUser._id);
                if(create_category){
                    let saveUser = await newUser.save();
                    return saveUser;
                }else{
                    return "Server Error"
                }
            }
        } catch (error) {
            return false
        }
    }
}