import { ApiProperty } from "@nestjs/swagger";

export class GetCategoryDto {
    @ApiProperty()
    _id: string;
}