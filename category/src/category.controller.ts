import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ExpenseResponseInterFace } from './interfaces/expense-response.interface';
import { IncomeResponseInterface } from './interfaces/income-response.interface';
import { NewCategoryResponse } from './interfaces/new-category-response.interface';
import { CategoryService } from './services/category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @MessagePattern({ cmd: "create_category" })
    public async createCategory(data: any): Promise<NewCategoryResponse> {
        let result: NewCategoryResponse;
        let category = await this.categoryService.createCategory(data);
        if (category && category != "exists") {
            result = {
                status: HttpStatus.ACCEPTED,
                message: "Category Created Successfully",
                category: category,
                errors: null
            }
        } else if (category === "exists") {
            result = {
                status: HttpStatus.CONFLICT,
                message: "Category Already Exists",
                category: null,
                errors: null
            }
        } else {
            result = {
                status: HttpStatus.BAD_REQUEST,
                message: "Bad Request",
                category: null,
                errors: null
            }
        }
        return result
    }

    @MessagePattern({ cmd: "all_category" })
    public async allCategory(data: any): Promise<NewCategoryResponse> {
        let result: NewCategoryResponse;
        let category = await this.categoryService.allCategory(data);
        if (category.length) {
            result = {
                status: HttpStatus.FOUND,
                message: "All Categories",
                category: category,
                errors: null
            }
        } else {
            result = {
                status: HttpStatus.BAD_REQUEST,
                message: "Bad Request",
                category: null,
                errors: null
            }
        }
        return result;

    }

    @MessagePattern({ cmd: "get_single_category" })
    public async getSingleCategory(data: any): Promise<NewCategoryResponse> {
        let result: NewCategoryResponse;
        try {

            let category = await this.categoryService.singleCategory(data);
            if (category && category != "invalid_id") {
                result = {
                    status: HttpStatus.FOUND,
                    message: "Category Found",
                    category: category,
                    errors: null
                }
            } else if (category === "invalid_id") {
                result = {
                    status: HttpStatus.NOT_ACCEPTABLE,
                    message: "Please Enter Valid Category Id",
                    category: null,
                    errors: null
                }
            } else {
                result = {
                    status: HttpStatus.NOT_FOUND,
                    message: "Not Found",
                    category: null,
                    errors: null
                }
            }

        } catch (error) {
            result = {
                status: HttpStatus.BAD_REQUEST,
                message: "BAD REQUEST",
                category: null,
                errors: null
            }
        }
        return result;
    }

    @MessagePattern({ cmd: "update_category" })
    public async updateCategory(data: any): Promise<NewCategoryResponse> {
        let result: NewCategoryResponse;
        try {
            let category = await this.categoryService.updateCategory(data);
            if (category && category != "invalid_id" && category != "exist") {
                result = {
                    status: HttpStatus.ACCEPTED,
                    message: "This Category Updated Successfully",
                    category: category,
                    errors: null
                }
            } else if (category === "invalid_id") {
                result = {
                    status: HttpStatus.NOT_ACCEPTABLE,
                    message: "Please Enter Valid Category Id",
                    category: null,
                    errors: null
                }
            } else if (category === "exist") {
                result = {
                    status: HttpStatus.CONFLICT,
                    message: "Category Already Exists",
                    category: null,
                    errors: null
                }
            } else {
                result = {
                    status: HttpStatus.NOT_FOUND,
                    message: "Not Found",
                    category: null,
                    errors: null
                }
            }
        } catch (error) {
            result = {
                status: HttpStatus.BAD_REQUEST,
                message: "BAD REQUEST",
                category: null,
                errors: null
            }
        }
        return result;
    }

    @MessagePattern({ cmd: "delete_category" })
    public async deleteCategory(data: any): Promise<NewCategoryResponse> {
        let result: NewCategoryResponse;
        try {
            let category = await this.categoryService.deleteCategory(data);
            if (category.message === "success" && category.message != "invalid_ids") {
                result = {
                    status: HttpStatus.ACCEPTED,
                    message: "This Categories Deleted Successfully",
                    category: category.data,
                    errors: null
                }
            } else if (category.message === "invalid_ids") {
                result = {
                    status: HttpStatus.NOT_ACCEPTABLE,
                    message: "Please Enter Valid Category Ids",
                    category: category.data,
                    errors: null
                }
            } else {
                result = {
                    status: HttpStatus.NOT_FOUND,
                    message: "Not Found",
                    category: null,
                    errors: null
                }
            }
        } catch (error) {
            result = {
                status: HttpStatus.BAD_REQUEST,
                message: "BAD REQUEST",
                category: null,
                errors: null
            }
        }
        return result;
    }



    @MessagePattern({ cmd: "get_expense_by_category" })
    public async getExpenseByCategory(data: any): Promise<any> {
        let result: ExpenseResponseInterFace;
        let expense = await this.categoryService.getExpenseByCategory(data);
        if (expense.length && expense != "invalid_id") {
            result = {
                status: HttpStatus.ACCEPTED,
                message: "All Expense By This Category",
                expense: expense,
                errors: null
            }
        } else if (expense === "invalid_id") {
            result = {
                status: HttpStatus.NOT_FOUND,
                message: "Please Enter The Valid Category Id",
                expense: null,
                errors: null
            }
        } else {
            result = {
                status: HttpStatus.NOT_FOUND,
                message: "Not Found",
                expense: null,
                errors: null
            }
        }
        return result;
    }




    @MessagePattern({ cmd: "get_income_by_category" })
    public async getIncomeeByCategory(data: any): Promise<any> {
        let result: IncomeResponseInterface;
        let income = await this.categoryService.getIncomeByCategory(data);
        if (income.length && income != "invalid_id") {
            result = {
                status: HttpStatus.ACCEPTED,
                message: "All income By This Category",
                income: income,
                errors: null
            }
        } else if (income === "invalid_id") {
            result = {
                status: HttpStatus.NOT_FOUND,
                message: "Please Enter The Valid Category Id",
                income: null,
                errors: null
            }
        } else {
            result = {
                status: HttpStatus.NOT_FOUND,
                message: "Not Found",
                income: null,
                errors: null
            }
        }
        return result;
    }

}
