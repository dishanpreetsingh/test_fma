import { ClientProxy } from "@nestjs/microservices";
import { GetIncomeDto } from "src/interfaces/income/get-income.dto";
import { NewIncomeDto } from "src/interfaces/income/new-income.dto";
export declare class IncomeController {
    private readonly incomeService;
    constructor(incomeService: ClientProxy);
    createIncome(req: any, posted_data: NewIncomeDto): Promise<any>;
    getAllIncomes(req: any): Promise<any>;
    getIncome(req: any, params: GetIncomeDto): Promise<any>;
    editIncome(req: any, params: GetIncomeDto, posted_data: NewIncomeDto): Promise<any>;
    deleteIncome(req: any, params: GetIncomeDto): Promise<any>;
}
