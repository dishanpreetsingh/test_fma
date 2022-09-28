import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;
@Schema()
export class User {
    @Prop()
    name: string;
    @Prop()
    email: string;
    @Prop()
    google_id: string;
    @Prop()
    profile_image: string;
    @Prop()
    created_at: Date;
    @Prop()
    updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
