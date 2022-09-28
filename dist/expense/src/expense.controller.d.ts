import { ExpenseService } from "./services/expense.service";
export declare class ExpenseController {
    private readonly expenseService;
    constructor(expenseService: ExpenseService);
    newExpense(data: any): Promise<any>;
    allExpenses(data: any): Promise<any>;
    getExpense(data: any): Promise<any>;
    editExpense(data: any): Promise<any>;
    deleteExpense(data: any): Promise<any>;
}
