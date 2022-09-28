import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class NewExpenseDto {
    @ApiProperty({
        type: Date,
        default: '2022-08-28'
    })
    @IsNotEmpty()
    date: any;
    @ApiProperty({
        type:String,
        default: "631b2a8a4bc2a7568b5b8ea0"
    })
    @IsNotEmpty()
    payment_type: any;
    @ApiProperty({
        type: String,
        default: "631ad751cd7a7a2bd840b1ad"
    })
    @IsNotEmpty()
    category: any;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    amount: Number;
    @ApiProperty()
    @IsNotEmpty()
    note: string;
}