import { Document } from "mongoose";
import { Category } from "./category.schema";
import { Payment } from "./payment.schema";
import { User } from "./user.schema";
export declare type ExpenseDocument = Expense & Document;
export declare class Expense {
    user_id: User;
    date: Date;
    payment_type: Payment;
    category: Category;
    amount: number;
    note: string;
    created_at: Date;
    updated_at: Date;
}
export declare const ExpenseSchema: any;
