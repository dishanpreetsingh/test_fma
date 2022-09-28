import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class createCategoryDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
    @ApiProperty({
        type:String,
        default:"expense"
    })
    @IsNotEmpty()
    type:any;
}