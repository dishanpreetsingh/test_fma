export declare type UserDocument = User & Document;
export declare class User {
    name: string;
    email: string;
    google_id: string;
    profile_image: string;
    created_at: Date;
    updated_at: Date;
}
export declare const UserSchema: any;
