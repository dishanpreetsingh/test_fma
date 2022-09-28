import { Document } from "mongoose";

export interface NewExpenseInterface extends Document{
    _id: string,
    user_id:string,
    date:Date,
    payment_type:string;
    category:string;
    amount: number;
    note:string;
    created_at:Date;
    updated_at: Date;
}