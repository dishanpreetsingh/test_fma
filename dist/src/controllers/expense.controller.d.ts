import { ClientProxy } from "@nestjs/microservices";
import { GetExpenseDto } from "src/interfaces/expense/get-expense.dto";
import { GetFilterExpenseDto } from "src/interfaces/expense/get-filter-expense.dto";
import { NewExpenseDto } from "src/interfaces/expense/new-expense.dto";
export declare class ExpenseController {
    private readonly expenseServiceClient;
    constructor(expenseServiceClient: ClientProxy);
    newExpense(new_expense: NewExpenseDto, req: any): Promise<any>;
    allExpenses(req: any, query: GetFilterExpenseDto): Promise<any>;
    getExpense(req: any, params: GetExpenseDto): Promise<any>;
    editExpense(req: any, params: GetExpenseDto, posted_data: NewExpenseDto): Promise<any>;
    deleteExpense(req: any, params: GetExpenseDto): Promise<any>;
}
