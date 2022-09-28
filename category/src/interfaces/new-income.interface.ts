import { Document } from "mongoose";

export interface NewIncomeInterface extends Document{
    _id: string,
    user_id:string,
    date:Date,
    category:string;
    amount: number;
    created_at:Date;
    updated_at: Date;
}