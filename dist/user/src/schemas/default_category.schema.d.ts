import { Document } from "mongoose";
export declare type defaultCategoryDocument = default_category & Document;
export declare class default_category {
    user_id: string;
    name: string;
    type: string;
    created_at: Date;
    updated_at: Date;
}
export declare const defaultCategorySchema: any;
