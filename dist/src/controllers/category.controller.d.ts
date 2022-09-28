import { ClientProxy } from "@nestjs/microservices";
import { ArrayIds } from "src/interfaces/category/array-ids.dto";
import { createCategoryDto } from "src/interfaces/category/create-category.dto";
import { getAllExpenseByCategory } from "src/interfaces/category/get-expense-by-category.dto";
import { GetCategoryDto } from "src/interfaces/category/get-expense-category.dto";
import { UpdateCategoryDto } from "src/interfaces/category/update-category.dto";
export declare class CategoryController {
    private readonly categoryServiceClient;
    constructor(categoryServiceClient: ClientProxy);
    createCategory(category: createCategoryDto, req: any): Promise<any>;
    allCategory(req: any): Promise<any>;
    singleCategory(req: any, params: GetCategoryDto): Promise<any>;
    updateCategory(req: any, params: GetCategoryDto, category: UpdateCategoryDto): Promise<any>;
    deleteCategory(req: any, arrayids: ArrayIds): Promise<any>;
    getAllExpenseByCategory(req: any, params: getAllExpenseByCategory): Promise<any>;
    getAllIncomeByCategory(req: any, params: getAllExpenseByCategory): Promise<any>;
}
