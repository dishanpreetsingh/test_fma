import { NewCategoryResponse } from './interfaces/new-category-response.interface';
import { CategoryService } from './services/category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    createCategory(data: any): Promise<NewCategoryResponse>;
    allCategory(data: any): Promise<NewCategoryResponse>;
    getSingleCategory(data: any): Promise<NewCategoryResponse>;
    updateCategory(data: any): Promise<NewCategoryResponse>;
    deleteCategory(data: any): Promise<NewCategoryResponse>;
    getExpenseByCategory(data: any): Promise<any>;
    getIncomeeByCategory(data: any): Promise<any>;
}
