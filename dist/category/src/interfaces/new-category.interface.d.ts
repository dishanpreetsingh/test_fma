import { Document } from "mongoose";
export interface NewCategoryInterface extends Document {
    _id: string;
    name: string;
    type: string;
    created_at: Date;
    updated_at: Date;
}
