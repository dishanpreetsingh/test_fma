import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GetIncomeDto {
    @ApiProperty()
    @IsNotEmpty()
    _id:string;
}