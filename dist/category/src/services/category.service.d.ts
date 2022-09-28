import { Model } from 'mongoose';
import { CategoryDocument } from 'src/schemas/category.schema';
import { ExpenseDocument } from 'src/schemas/expense.schema';
import { IncomeDocument } from 'src/schemas/income.schema';
export declare class CategoryService {
    private readonly categoryModel;
    private readonly expenseModel;
    private readonly incomeModel;
    constructor(categoryModel: Model<CategoryDocument>, expenseModel: Model<ExpenseDocument>, incomeModel: Model<IncomeDocument>);
    checkCategoryName(data: any): Promise<any>;
    createCategory(data: any): Promise<any>;
    allCategory(data: any): Promise<any>;
    singleCategory(data: any): Promise<any>;
    updateCategory(data: any): Promise<any>;
    getExpenseByCategory(data: any): Promise<any>;
    getDifference(array1: any, array2: any): any;
    getIncomeByCategory(data: any): Promise<any>;
    deleteCategory(data: any): Promise<any>;
}
