import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type defaultCategoryDocument = default_category & Document;

@Schema()
export class default_category {
    @Prop()
    user_id:string
    @Prop()
    name: string;
    @Prop()
    type: string;
    @Prop()
    created_at: Date;
    @Prop()
    updated_at: Date;
}

export const defaultCategorySchema = SchemaFactory.createForClass(default_category);