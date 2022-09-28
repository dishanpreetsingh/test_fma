import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class getAllExpenseByCategory {
    @ApiProperty()
    @IsNotEmpty()
    category_id: string;
}