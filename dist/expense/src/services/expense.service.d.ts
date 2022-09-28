import { Model } from "mongoose";
import { ExpenseDocument } from "src/schemas/expense.schema";
import { PaymentDocument } from "src/schemas/payment.schema";
import { CategoryDocument } from "src/schemas/category.schema";
export declare class ExpenseService {
    private readonly expenseModel;
    private readonly paymentModel;
    private readonly categoryModel;
    constructor(expenseModel: Model<ExpenseDocument>, paymentModel: Model<PaymentDocument>, categoryModel: Model<CategoryDocument>);
    checkPaymentId(id: string): Promise<any>;
    checkCategoryId(id: any, user_id: any): Promise<any>;
    newExpense(data: any): Promise<any>;
    getAllExpenses(data: any): Promise<any>;
    getExpense(data: any): Promise<any>;
    editExpense(data: any): Promise<any>;
    deleteExpense(data: any): Promise<any>;
}
