import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
export class GetExpenseDto {
    @ApiProperty()
    @IsNotEmpty()
    _id:string
}
