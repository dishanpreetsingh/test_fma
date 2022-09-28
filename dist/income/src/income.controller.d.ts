import { incomeService } from "./services/income.service";
export declare class IncomeController {
    private readonly incomeService;
    constructor(incomeService: incomeService);
    createIncome(data: any): Promise<any>;
    allIncomes(data: any): Promise<any>;
    getIncome(data: any): Promise<any>;
    editIncome(data: any): Promise<any>;
    deleteIncome(data: any): Promise<any>;
}
