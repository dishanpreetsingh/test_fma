import { NewCategoryInterface } from "./new-category.interface";
export interface NewCategoryResponse {
    status: number;
    message: string;
    category: NewCategoryInterface | null;
    errors: {
        [key: string]: any;
    } | null;
}
