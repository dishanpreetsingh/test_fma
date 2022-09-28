import { ApiProperty } from "@nestjs/swagger";

export class ArrayIds {
    @ApiProperty({
        type: String,
        default: ["63281a41680a2888f380719b","63281a41680a2888f380719b"]
    })
    _ids: any;
}