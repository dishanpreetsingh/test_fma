import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Category } from "./category.schema";
import { User } from "./user.schema";


export type IncomeDocument = Income & Document;
@Schema()
export class Income {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
    user_id: User
    @Prop()
    date: Date;
    @Prop({type:mongoose.Schema.Types.ObjectId, ref: "Category"})
    category: Category;
    @Prop()
    amount:number;
    @Prop()
    created_at: Date;
    @Prop()
    updated_at: Date;
}

export const IncomeSchema = SchemaFactory.createForClass(Income);
