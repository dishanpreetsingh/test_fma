import { NewIncomeInterface } from "./new-income.interface";
export interface IncomeResponseInterface {
    status: number;
    message: string;
    income: NewIncomeInterface | null;
    errors: null;
}
