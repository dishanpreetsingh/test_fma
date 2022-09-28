import { Document } from "mongoose";
import { User } from "./user.schema";
export declare type CategoryDocument = Category & Document;
export declare class Category {
    user_id: User;
    name: string;
    type: string;
    created_at: Date;
    updated_at: Date;
}
export declare const CategorySchema: any;
