import { Model } from "mongoose";
import { CategoryDocument } from "src/schemas/category.schema";
import { IncomeDocument } from "src/schemas/income.schema";
export declare class incomeService {
    private readonly incomeModel;
    private categoryModel;
    constructor(incomeModel: Model<IncomeDocument>, categoryModel: Model<CategoryDocument>);
    checkCategoryId(id: any, user_id: any): Promise<any>;
    newIncome(data: any): Promise<any>;
    all_incomes(data: any): Promise<any>;
    getIncome(data: any): Promise<any>;
    edit_income(data: any): Promise<any>;
    deleteIncome(data: any): Promise<any>;
}
