import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Category } from "./category.schema";
import { Payment } from "./payment.schema";
import { User } from "./user.schema";


export type ExpenseDocument = Expense & Document;
@Schema()
export class Expense {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
    user_id: User
    @Prop()
    date: Date;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Payment"})
    payment_type:Payment;
    @Prop({type:mongoose.Schema.Types.ObjectId, ref: "Category"})
    category: Category;
    @Prop()
    amount:number;
    @Prop()
    note: string;
    @Prop()
    created_at: Date;
    @Prop()
    updated_at: Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
