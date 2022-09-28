import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type PaymentDocument = Payment & Document;
@Schema()
export class Payment {
    @Prop()
    name: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);