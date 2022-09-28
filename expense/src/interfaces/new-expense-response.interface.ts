import { NewExpenseInterface } from "./new-expense.interface";

export interface NewExpenseResponseInterFace {
    status: number;
    message:string;
    expense: NewExpenseInterface | null;
    errors: {[key:string]:any} | null;
}