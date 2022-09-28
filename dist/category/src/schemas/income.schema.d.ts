import { Document } from "mongoose";
import { Category } from "./category.schema";
import { User } from "./user.schema";
export declare type IncomeDocument = Income & Document;
export declare class Income {
    user_id: User;
    date: Date;
    category: Category;
    amount: number;
    created_at: Date;
    updated_at: Date;
}
export declare const IncomeSchema: any;
