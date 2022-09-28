import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class NewIncomeDto {
    @ApiProperty({
        type: Date,
        default: '2022-08-28'
    })
    @IsNotEmpty()
    date: any;
   
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
   
}