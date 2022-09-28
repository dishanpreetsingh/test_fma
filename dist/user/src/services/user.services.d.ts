import { Model } from "mongoose";
import { CategoryDocument } from "src/schemas/category.scheam";
import { defaultCategoryDocument } from "src/schemas/default_category.schema";
import { UserDocument } from "src/schemas/user.schema";
export declare class UserService {
    private readonly userModel;
    private readonly CategoryModel;
    private readonly defaultCategoryModel;
    constructor(userModel: Model<UserDocument>, CategoryModel: Model<CategoryDocument>, defaultCategoryModel: Model<defaultCategoryDocument>);
    createCategory(user_id: any): Promise<any>;
    createUser(data: any): Promise<any>;
}
