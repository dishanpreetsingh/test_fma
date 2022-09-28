import { NewExpenseInterface } from "./new-expense.interface";

export interface ExpenseResponseInterFace {
    status: number;
    message:string;
    expense: NewExpenseInterface | null;
    errors: {[key:string]:any} | null;
}