import { ApiProperty } from "@nestjs/swagger";


export class GetFilterExpenseDto{
    @ApiProperty({required: false })
    type: string;
    @ApiProperty({required: false })
    month_year_type: string;
}