import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "./user.schema";

export type CategoryDocument = Category & Document ;
@Schema()
export class Category {
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User'})
    user_id: User;
    @Prop()
    name: string;
    @Prop()
    type: string;
    @Prop()
    created_at: Date;
    @Prop()
    updated_at: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);