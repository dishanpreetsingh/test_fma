import { NewIncomeInterface } from "./new-income.interface";

export interface newIncomeResponseInterface {
    status: number;
    message: string;
    income: NewIncomeInterface | null;
    errors: null;
}